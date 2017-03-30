import gql from 'graphql-tag';

const createSubscriber = gql`
  mutation createSubscriber($subscriber: CreateSubscriberInput!) {
    createSubscriber(input: $subscriber) {
      subscriber {
        id,
        email,
        errors,
        confirmed
      }
    }
  }
`;

const updateSubscriber = gql`
  mutation updateSubscriber($subscriber: UpdateSubscriberInput!) {
    updateSubscriber(input: $subscriber) {
      subscriber {
        id,
        email,
        errors,
        confirmed
      }
    }
  }
`;

const confirmSubscriber = gql`
  mutation confirmSubscriber($subscriber: ConfirmSubscriberInput!) {
    confirmSubscriber(input: $subscriber) {
      subscriber {
        id,
        email,
        errors,
        confirmed
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
  updateSubscriber,
  confirmSubscriber,
}
