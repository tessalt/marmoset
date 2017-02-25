import gql from 'graphql-tag';

const createList = gql`
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

export {
  createList,
  destroyList
}
