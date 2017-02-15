import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router'

class NewList extends React.Component {
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.refs.name.value);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label><input ref="name" placeholder="name" /></label>
        <button type="submit">create</button>
      </form>
    )
  }
}

NewList.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const submitList = gql`
  mutation createList($list: CreateListInput!) {
    createList(input: $list) {
      list {
        name,
        id
      }
    }
  }
`

const destroyList = gql`
  mutation destroyList($list: DestroyListInput!) {
    destroyList(input: $list) {
      user {
        id
      }
    }
  }
`;

const listQuery = gql`query Lists { lists { id, name }  }`

const ListLink = (props) => {
  function onDeleteClick() {
    props.onDeleteClick(props.id);
  }
  return (
    <div>
      <h2><Link to={`/lists/${props.id}`}> {props.name} </Link></h2>
      <button onClick={onDeleteClick}>Delete</button>
    </div>
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
    })
  }
  render() {
    return (
      <div>
        <h1>Lists</h1>
        <NewList onSubmit={this.createNewList.bind(this)}/>
        { this.props.data.loading
          ? 'loading'
          : this.props.data.lists.map((list, key) => {
            return <ListLink key={key} {...list} onDeleteClick={this.destroyList.bind(this)}/>
          })
        }
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
  graphql(listQuery),
  graphql(destroyList, {
    name: 'destroyList',
    props({ownProps, mutate}) {
      return {
        destroyList: (props) => {
          return mutate({
            variables: props.variables,
            updateQueries: {
              Lists: (prev, {mutationResult}) => {
                return update(prev, {
                  lists: {
                  }
                });
              }
            }
          })
        }
      }
    }
  }),
  graphql(submitList, {
    name: 'createList'
  }),
)(Lists)
