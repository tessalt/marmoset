import gql from 'graphql-tag';

const createSubscriber = gql`
  mutation createSubscriber($subscriber: CreateSubscriberInput!) {
    createSubscriber(input: $subscriber) {
      subscriber {
        id,
        email,
        errors
      }
    }
  }
`;

export {
  createSubscriber
}
