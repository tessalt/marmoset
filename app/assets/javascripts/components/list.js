import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import { Link } from 'react-router'
import SubscriberForm from './subscriber-form';
import {createSubscriber, destroySubscriber} from '../mutations/subscriber';
import {showList} from '../queries/list';

const Letters = (props) => {
  const lettersList = props.letters.map((letter, key) => {
    const path = `letters/${letter.node.id}${letter.node.sent ? '' : '/edit'}`;
    return (
      <tr key={key}>
        <td><Link to={path} className="light-purple link underline">{letter.node.subject}</Link></td>
      </tr>
    )
  });
  return (
    <table cellSpacing="0"><tbody>{lettersList}</tbody></table>
  )
}

const Subscribers = (props) => {
  const subscribersList = props.subscribers.edges.map((subscriber, key) => {
    function onDelete() {
      props.onDelete(subscriber.node.id);
    }
    return (
      <tr key={key}>
        <td>{subscriber.node.email}</td>
        <td><button className="f6 link dim b--red bg-white ba bw1 ph3 pv2 red tr" onClick={onDelete}>Delete</button></td>
      </tr>
    )
  });
  return (
    <table className="w-100" cellSpacing="0"><tbody>{subscribersList}</tbody></table>
  )
}

class List extends React.Component {
  createSubscriber(email) {
    return this.props.submit({
      variables: {
        subscriber: {
          email,
          list_id: this.props.data.list.id,
          confirmed: true
        }
      }
    }).then((response) => {
      return response.data.createSubscriber.subscriber.errors;
    })
  }

  deleteSubscriber(id) {
    return this.props.destroySubscriber({
      variables: {
        subscriber: {
          id,
        }
      }
    })
  }

  render() {
    let sentLetters, drafts;
    if (!this.props.data.loading) {
      sentLetters = this.props.data.list.letters.edges.filter((edge) => {
        return edge.node.sent;
      });
      drafts = this.props.data.list.letters.edges.filter((edge) => {
        return !edge.node.sent;
      });
    }

    return (
      <div>
        {!this.props.data.loading &&
          <div className="cf">
            <div className="fl w-20 pa2">
              <Link to="/lists" className="db pv2 link">Lists</Link>
              <Link to="/settings" className="db pv2 link black">Settings</Link>
            </div>
            <div className="fl w-60">
              <div className="cf mt2">
                <h2 className="f2 normal fl mt0">{this.props.data.list.name}</h2>
                <Link className="fr f6 link dim bn ph3 pv2 bg-light-purple white" to={`/lists/${this.props.data.list.id}/compose`}>Compose</Link>
              </div>
              <h3>Sent Letters</h3>
              <Letters letters={sentLetters} />
              <h3>Drafts</h3>
              <Letters letters={drafts} />
              <h3>Subscribers</h3>
              <Subscribers {...this.props.data.list} onDelete={this.deleteSubscriber.bind(this)} />
              <h3>Add new subscriber</h3>
              <SubscriberForm onSubmit={this.createSubscriber.bind(this)} />
            </div>
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
  graphql(destroySubscriber, {
    name: 'destroySubscriber',
    props: ({ownProps, destroySubscriber}) => {
      return {
        destroySubscriber: (props) => {
          return destroySubscriber({
            variables: props.variables,
            updateQueries: {
              List: (prev, { mutationResult }) => {
                const id = mutationResult.data.destroySubscriber.id;
                const index = prev.list.subscribers.edges.findIndex((edge) => {
                  return edge.node.id === id;
                });
                return update(prev, {
                  list: {
                    subscribers: {
                      edges: {
                        $splice: [[index, 1]]
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
