import gql from 'graphql-tag';

const showLetter = gql`
  query Letter($letter: ID!) {
    letter(id: $letter) {
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
