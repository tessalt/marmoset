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

const destroySubscriber = gql`
  mutation destroySubscriber($subscriber: DestroySubscriberInput!) {
    destroySubscriber(input: $subscriber) {
      id
    }
  }
`;

export {
  createSubscriber,
  destroySubscriber,
}
