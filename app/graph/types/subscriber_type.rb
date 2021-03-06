SubscriberType = GraphQL::ObjectType.define do
  name 'Subscriber'

  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :email, !types.String
  field :confirmed, !types.Boolean
  field :listId do
    type types.ID
    resolve -> (obj, args, ctx) do
      GraphQL::Schema::UniqueWithinType.encode(ListType.name, obj.list_id)
    end
  end
  field :errors, types[types.String], "Reasons the object couldn't be created or updated" do
    resolve ->(obj, args, ctx) { obj.errors.full_messages }
  end
end
