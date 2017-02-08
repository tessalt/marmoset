import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

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

const List = (props) => {
  return (
    <div>
      {!props.data.loading &&
        <div>
          <h2>{props.data.list.name}</h2>
          <Subscribers {...props.data.list} />
        </div>
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
