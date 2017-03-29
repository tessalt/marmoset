import React, {PropTypes} from 'react';
import { compose, graphql } from 'react-apollo';
import SubscriberForm from './subscriber-form';
import SideNav from './side-nav';
import ListForm from './list-form';
import update from 'immutability-helper';
import {createSubscriber, destroySubscriber} from '../mutations/subscriber';
import {showList} from '../queries/list';
import {updateList} from '../mutations/list';

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

class ListEdit extends React.Component {
  updateList(name) {
    return this.props.updateList({
      variables: {
        list: {
          id: this.props.data.list.id,
          name
        }
      }
    })
  }
  createSubscriber(email) {
    return this.props.createSubscriber({
      variables: {
        subscriber: {
          email,
          list_id: this.props.data.list.id,
          confirmed: true
        }
      }
    }).then((response) => {
      return response.data.createSubscriber.subscriber.errors;
    });
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
    return (
      <div className="cf">
        <SideNav />
          <div className="fl w-60">
          {this.props.data.list &&
            <div>
              <h1>{this.props.data.list.name}</h1>
              <ListForm onSubmit={this.updateList.bind(this)} action="Update list" name={this.props.data.list.name} />
              <h2>Subscribers</h2>
              <Subscribers {...this.props.data.list} onDelete={this.deleteSubscriber.bind(this)} />
            </div>
          }
          <h3>Add new subscriber</h3>
          <SubscriberForm onSubmit={this.createSubscriber.bind(this)} />
        </div>
      </div>
    )
  }
}

ListEdit.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    list: PropTypes.obj
  }),
  createSubscriber: PropTypes.func.isRequired
}

export default compose (
  graphql(showList, {
    options: ({params}) => {
      return {
        variables: {
          list: params.id
        }
      }
    }
  }),
  graphql(updateList, {
    name: 'updateList'
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
    name: 'createSubscriber',
    props({ownProps, createSubscriber}) {
      return  {
        createSubscriber: (props) =>  {
          return createSubscriber({
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
                // console.log('log', update(prev, {
                //   list: {
                //     errors: {
                //       $set: []
                //     },
                //     subscribers: {
                //       edges: {
                //         $push: [newSubscriber]
                //       }
                //     }
                //   }
                // }));
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
)(ListEdit);
