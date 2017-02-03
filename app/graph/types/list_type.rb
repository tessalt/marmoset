ListType = GraphQL::ObjectType.define do
  name 'List'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :name, !types.String
  connection :subscribers, SubscriberType.connection_type do
    resolve -> (object, args, ctx) {
      object.subscribers
    }
  end
end
