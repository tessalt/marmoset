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

export {
  indexLists,
  showList
}
