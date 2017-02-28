class SubscriberMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateSubscriber"
    input_field :email, !types.String
    input_field :list_id, !types.ID

    return_field :subscriber, SubscriberType

    resolve -> (object, inputs, ctx) {
      list = Schema::object_from_id(inputs[:list_id], ctx)
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
      subscriber = Schema::object_from_id(inputs[:id], ctx)

      if user.can_access?(subscriber)
        subscriber.update_attributes(email: inputs[:email])

        {
          subscriber: subscriber
        }
      else
        GraphQL::ExecutionError.new('insufficent permissions')
      end
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroySubscriber"
    input_field :id, !types.ID

    return_field :id, types.ID

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      subscriber = Schema::object_from_id(inputs[:id], ctx)
      if user.can_access?(subscriber)
        subscriber.destroy

        {
          id: inputs[:id]
        }
      else
        GraphQL::ExecutionError.new('insufficent permissions')
      end
    }
  end
end
