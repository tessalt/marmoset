import gql from 'graphql-tag';

const createLetter = gql`
  mutation createLetter($letter: CreateListInput!) {
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
