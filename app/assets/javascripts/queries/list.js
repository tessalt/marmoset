import gql from 'graphql-tag';

const indexLists = gql`query Lists { lists { id, name }  }`

const showList = gql`
  query List($list: ID!){
    list(id: $list) {
      errors,
      id,
      name,
      letters {
        edges {
          node {
            list_id,
            subject,
            id,
            contents,
            sent,
          }
        }
      },
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

const publicList = gql`
  query PublicList($user: ID!, $list: ID!) {
    publicList(list_id: $list, user_id: $user) {
      id,
      user_id,
      name
    }
  }
`;

export {
  indexLists,
  showList,
  publicList
}
