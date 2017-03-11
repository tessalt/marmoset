class SubscriberMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateSubscriber"
    input_field :email, !types.String
    input_field :confirmed, types.Boolean
    input_field :list_id, !types.ID

    return_field :subscriber, SubscriberType

    resolve -> (object, inputs, ctx) {
      list = Schema::object_from_id(inputs[:list_id], ctx)
      valid_attributes = inputs.to_h.select{|key, input| inputs.key? key}
      subscriber = list.subscribers.build(valid_attributes)
      if subscriber.save && !subscriber.confirmed
        mail = ListMailer.confirm_subscriber(subscriber)
        begin
          mail.deliver_now
        rescue Exception => e
          puts e
        end
      end

      {
        subscriber: subscriber
      }
    }
  end

  Update = GraphQL::Relay::Mutation.define do
    name "UpdateSubscriber"
    input_field :id, !types.ID
    input_field :email, types.String
    input_field :confirmed, types.Boolean

    return_field :subscriber, SubscriberType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      subscriber = Schema::object_from_id(inputs[:id], ctx)

      if user.can_access?(subscriber)
        valid_attributes = inputs.to_h.select{|key, input| inputs.key? key}.except('id')
        subscriber.update_attributes(valid_attributes)

        {
          subscriber: subscriber
        }
      else
        GraphQL::ExecutionError.new('insufficent permissions')
      end
    }
  end

  Confirm = GraphQL::Relay::Mutation.define do
    name "ConfirmSubscriber"
    input_field :id, !types.ID

    return_field :subscriber, SubscriberType

    resolve -> (object, inputs, ctx) {
      subscriber = Schema::object_from_id(inputs[:id], ctx)
      subscriber.update_attributes(confirmed: true)
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
