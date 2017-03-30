import gql from 'graphql-tag';

const indexLetters = gql`
  query Letters {
    letters {
      errors,
      id,
      subject,
      contents,
      sent,
      list {
        id,
        name,
      }
    }
  }
`

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
  showLetter,
  indexLetters
}
