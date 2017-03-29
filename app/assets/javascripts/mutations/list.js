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

const updateList = gql`
  mutation updateList($list: UpdateListInput!) {
    updateList(input: $list) {
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
      id
    }
  }
`;

export {
  createList,
  destroyList,
  updateList
}
