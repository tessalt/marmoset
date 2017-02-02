SubscriberType = GraphQL::ObjectType.define do
  name 'Subscriber'
  field :id, !types.ID
  field :email, !types.String
end
