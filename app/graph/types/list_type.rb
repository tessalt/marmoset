ListType = GraphQL::ObjectType.define do
  name 'List'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :name, !types.String

  field :user_id do
    type types.ID
    resolve -> (obj, args, ctx) do
      GraphQL::Schema::UniqueWithinType.encode(ListType.name, obj.user_id)
    end
  end

  connection :subscribers, SubscriberType.connection_type do
    resolve -> (object, args, ctx) {
      object.subscribers
    }
  end
  connection :letters, LetterType.connection_type do
    resolve -> (object, args, ctx) {
      object.letters
    }
  end
  field :errors, types[types.String], "Reasons the object couldn't be created or updated" do
    resolve ->(obj, args, ctx) { obj.errors.full_messages }
  end
end
