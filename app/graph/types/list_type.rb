ListType = GraphQL::ObjectType.define do
  name 'List'
  field :id, !types.ID
  field :name, !types.String
  field :subscribers, types[SubscriberType]
end
