class SubscriberMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateSubscriber"
    input_field :email, !types.String
    input_field :list_id, !types.ID

    return_field :subscriber, SubscriberType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      type, list_id = GraphQL::Schema::UniqueWithinType.decode(inputs[:list_id])
      list = user.lists.find(list_id)
      subscriber = list.subscribers.create(email: inputs[:email])

      {
        subscriber: subscriber
      }
    }
  end

  Update = GraphQL::Relay::Mutation.define do
    name "UpdateSubscriber"
    input_field :id, !types.ID
    input_field :email, !types.String

    return_field :subscriber, SubscriberType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      type, id = GraphQL::Schema::UniqueWithinType.decode(inputs[:id])
      subscriber = Subscriber.find(id)
      list = user.lists.find(subscriber.list_id)
      subscriber.update_attributes(email: inputs[:email])

      {
        subscriber: subscriber
      }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroySubscriber"
    input_field :id, !types.ID

    return_field :id, types.ID

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      type, id = GraphQL::Schema::UniqueWithinType.decode(inputs[:id])
      subscriber = Subscriber.find(id)
      list = user.lists.find(subscriber.list_id)
      subscriber.destroy

      {
        id: inputs[:id]
      }
    }
  end
end
