import gql from 'graphql-tag';

const createLetter = gql`
  mutation createLetter($letter: CreateLetterInput!) {
    createLetter(input: $letter) {
      letter {
        id,
        subject,
        contents,
        errors
      }
    }
  }
`;

export {
  createLetter
}
