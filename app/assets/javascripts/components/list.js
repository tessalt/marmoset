import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const List = (props) => {
  return (
    <div>
      {!props.data.loading &&
        <h2>{props.data.list.name}</h2>
      }
    </div>
  )
}

List.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    list: PropTypes.obj
  }),
}

const ListQuery = gql`
  query List($list: ID!){
    list(id: $list) {
      id,
      name
    }
  }
`

const ListWithData = graphql(ListQuery, {
  options: ({params}) => {
    return {
      variables: {
        list: params.id
      }
    }
  }
})(List);

export default ListWithData;
