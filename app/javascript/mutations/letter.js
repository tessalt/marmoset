import gql from 'graphql-tag';

const createLetter = gql`
  mutation createLetter($letter: CreateLetterInput!) {
    createLetter(input: $letter) {
      letters {
        id,
        subject,
        contents,
        errors
      }
    }
  }
`;

const updateLetter = gql`
  mutation updateLetter($letter: UpdateLetterInput!) {
    updateLetter(input: $letter) {
      letter {
        id,
        sent,
        subject,
        contents,
        errors
      }
    }
  }
`;

const sendLetter = gql`
  mutation sendLetter($letter: SendLetterInput!) {
    sendLetter(input: $letter) {
      letter {
        id,
        sent,
        subject,
        contents,
        errors
      }
    }
  }
`;

const destroyLetter = gql`
  mutation destroyLetter($letter: DestroyLetterInput!) {
    destroyLetter(input: $letter) {
      letters {
        id,
        sent,
        subject,
        contents,
        errors
      }
    }
  }

`

export {
  createLetter,
  updateLetter,
  sendLetter,
  destroyLetter,
}
