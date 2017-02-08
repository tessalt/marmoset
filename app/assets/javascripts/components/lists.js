import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import List from './list';

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


const listQuery = gql`query Lists { lists { id, name }  }`

class Lists extends React.Component {
  createNewList(name) {
    this.props.mutate({
      variables: {
        list: {
          name
        }
      }
    }).then((data) => {
        console.log(data);
    });
  }
  render() {
    return (
      <div>
        <h1>Lists</h1>
        <NewList onSubmit={this.createNewList.bind(this)}/>
        { this.props.data.loading
          ? 'loading'
          : this.props.data.lists.map((list, key) => {
            return <List key={key} {...list} />
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
  mutate: PropTypes.func.isRequired
}

export default compose(
  graphql(listQuery),
  graphql(submitList)
)(Lists)

