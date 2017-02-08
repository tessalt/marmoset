import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

const ListErrors = (props) => {
  if (!props.errors || !props.errors.length) {
    return null;
  }
  const errors = props.errors.map((error, key) => {
    return (
      <p key={key}>{error}</p>
    )
  });
  return (
    <div>
      <h4>errors</h4>
      {errors}
    </div>
  )
}


class NewSubscriber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.refs.email.value).then((errors) => {
      if (errors.length) {
        this.setState({
          errors,
        });
      } else {
        this.setState({
          errors: [],
        });
        this.refs.email.value = '';
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label><input ref="email" placeholder="email" /></label>
        <button type="submit">create</button>
        <ListErrors errors={this.state.errors} />
      </form>
    )
  }
}

NewSubscriber.propTypes = {
  onSubmit: PropTypes.func.isRequired
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
            <Subscribers {...this.props.data.list} />
            <NewSubscriber onSubmit={this.createSubscriber.bind(this)} />
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

const SubscriberMutation = gql`
  mutation createSubscriber($subscriber: CreateSubscriberInput!) {
    createSubscriber(input: $subscriber) {
      subscriber {
        id,
        email,
        errors
      }
    }
  }
`;

const ListQuery = gql`
  query List($list: ID!){
    list(id: $list) {
      errors,
      id,
      name,
      subscribers {
        edges {
          node {
            email,
            id
          }
        }
      }
    }
  }
`

const ListWithData = compose (
  graphql(ListQuery, {
    options: ({params}) => {
      return {
        variables: {
          list: params.id
        }
      }
    }
  }),
  graphql(SubscriberMutation, {
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
