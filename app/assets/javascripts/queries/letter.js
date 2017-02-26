import gql from 'graphql-tag';

const showLetter = gql`
  query Letter($letter: ID!, $list: ID!) {
    letter(list_id: $list, id: $letter) {
      errors,
      id,
      subject,
      contents,
    }
  }
`

export {
  showLetter
}
