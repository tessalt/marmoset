import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import {publicList} from '../../queries/list';

class Subscribe extends React.Component {
  render() {
    console.log(this.props);
    return (
      <h3>Subscribe</h3>
    )
  }
}

export default graphql(publicList, {
  options: ({params}) => {
    return {
      variables: {
        list: params.list_id,
        user: params.user_id,
      }
    }
  }
})(Subscribe);
