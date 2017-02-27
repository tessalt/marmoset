import gql from 'graphql-tag';

const showLetter = gql`
  query Letter($letter: ID!, $list: ID!) {
    letter(list_id: $list, id: $letter) {
      list_id,
      errors,
      id,
      subject,
      contents,
      sent,
    }
  }
`

export {
  showLetter
}
