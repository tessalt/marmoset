import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import List from './list';

const listQuery = gql`query Lists { lists { id, name }  }`

class Lists extends React.Component {
  render() {
    return (
      <div>
        <h1>Lists</h1>
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


export default graphql(listQuery)(Lists);

