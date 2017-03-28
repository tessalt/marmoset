import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router'
import update from 'immutability-helper';
import {indexLists} from '../queries/list';
import {createList, destroyList} from '../mutations/list';
import ListForm from './list-form';

const ListLink = (props) => {
  function onDeleteClick() {
    props.onDeleteClick(props.id);
  }
  return (
    <tr>
      <td className="pv2"><Link to={`/lists/${props.id}`} className="light-purple dim"> {props.name} </Link></td>
      <td className="pv2"><button className="f6 link dim b--red bg-white ba bw1 ph3 pv2 red tr" onClick={onDeleteClick}>Delete</button></td>
    </tr>
  )
}

class Lists extends React.Component {
  createNewList(name) {
    this.props.createList({
      variables: {
        list: {
          name
        }
      }
    }).then((response) => {
      this.props.router.replace(`/lists/${response.data.createList.list.id}`)
    });
  }
  destroyList(id) {
    this.props.destroyList({
      variables: {
        list: {
          id,
        }
      }
    }).then(() => {
      // this.props.data.refetch();
    });
  }
  render() {
    const lists = this.props.data.lists ? this.props.data.lists.map((list, key) => {
      return <ListLink key={key} {...list} onDeleteClick={this.destroyList.bind(this)}/>
    }) : null;
    return (
      <div>
        <div className="fl w-20 pa2">
          <Link to="/lists" className="db pv2 link">Lists</Link>
          <Link to="/settings" className="db pv2 link black">Settings</Link>
        </div>
        <div className="fl w-80">
          <h1 className="f2 lh-copy normal">Lists</h1>
          <ListForm onSubmit={this.createNewList.bind(this)}/>
          <table cellSpacing="0" className="w-100">
            <tbody>
              {lists}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Lists.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    lists: PropTypes.array
  }),
  createList: PropTypes.func.isRequired,
  destroyList: PropTypes.func.isRequired,
}

export default compose(
  graphql(indexLists, {
    forceFetch: true
  }),
  graphql(destroyList, {
    name: 'destroyList',
    props: ({ownProps, destroyList}) => {
      return {
        destroyList: (props) => {
          return destroyList({
            variables: props.variables,
            updateQueries: {
              Lists: (prev, {mutationResult}) => {
                const id = mutationResult.data.destroyList.id;
                const index = prev.lists.findIndex((edge) => {
                  return edge.id === id;
                });
                return update(prev, {
                  lists: {
                    $splice: [[index, 1]]
                  }
                });
              }
            }
          })
        }
      }
    }
  }),
  graphql(createList, {
    name: 'createList',
    props: ({ownProps, createList}) => {
      return {
        createList: (props) => {
          return createList({
            variables: props.variables,
            updateQueries: {
              Lists: (prev, {mutationResult}) => {
                const newList = mutationResult.data.createList.list;
                return update(prev, {
                  lists: {
                    $push: [newList]
                  }
                });
              }
            }
          })
        }
      }
    }
  }),
)(Lists)
