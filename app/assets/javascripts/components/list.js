import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import { Link } from 'react-router'
import SubscriberForm from './subscriber-form';
import {createSubscriber} from '../mutations/subscriber';
import {showList} from '../queries/list';

const Letters = (props) => {
  const lettersList = props.letters.edges.map((letter, key) => {
    return (
      <li key={key}><Link to={`/lists/${props.id}/letters/${letter.node.id}/edit`}>{letter.node.subject}</Link></li>
    )
  });
  return (
    <ul>{lettersList}</ul>
  )
}

const Subscribers = (props) => {
  const subscribersList = props.subscribers.edges.map((subscriber, key) => {
    return (
      <p key={key}>{subscriber.node.email}</p>
    )
  });
  return (
    <ul>{subscribersList}</ul>
  )
}

class List extends React.Component {
  createSubscriber(email) {
    return this.props.submit({
      variables: {
        subscriber: {
          email,
          list_id: this.props.data.list.id
        }
      }
    }).then((response) => {
      return response.data.createSubscriber.subscriber.errors;
    })
  }

  render() {
    return (
      <div>
        {!this.props.data.loading &&
          <div>
            <h2>{this.props.data.list.name}</h2>
            <Link to={`/lists/${this.props.data.list.id}/compose`}>Compose</Link>
            <h3>Subscribers</h3>
            <Subscribers {...this.props.data.list} />
            <h3>Letters</h3>
            <Letters {...this.props.data.list} />
            <SubscriberForm onSubmit={this.createSubscriber.bind(this)} />
          </div>
        }
      </div>
    )
  }
}

List.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    list: PropTypes.obj
  }),
  submit: PropTypes.func.isRequired
}

const ListWithData = compose (
  graphql(showList, {
    options: ({params}) => {
      return {
        variables: {
          list: params.id
        }
      }
    }
  }),
  graphql(createSubscriber, {
    props({ownProps, mutate}) {
      return  {
        submit: (props) =>  {
          return mutate({
            variables: props.variables,
            updateQueries: {
              List: (prev, {mutationResult}) => {
                const subscriber = mutationResult.data.createSubscriber.subscriber;
                if (subscriber.errors.length) {
                  return update(prev, {
                    list: {
                      errors: {
                        $set: subscriber.errors
                      }
                    }
                  });
                }
                const newSubscriber = {
                  __typename: 'SubscriberEdge',
                  node: subscriber
                }
                return update(prev, {
                  list: {
                    errors: {
                      $set: []
                    },
                    subscribers: {
                      edges: {
                        $push: [newSubscriber]
                      }
                    }
                  }
                });
              }
            }
          })
        }
      }
    }
  })
)(List);

export default ListWithData;
