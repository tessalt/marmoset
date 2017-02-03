QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'Root of schema'

  field :lists do
    type types[ListType]
    resolve -> (obj, args, ctx) do
      ctx[:current_user].lists
    end
  end

  field :list do
    type ListType
    argument :id, types.ID
    resolve -> (obj, args, ctx) do
      type, id = GraphQL::Schema::UniqueWithinType.decode(args[:id])
      ctx[:current_user].lists.find(id)
    end
  end

  field :node, GraphQL::Relay::Node.field
end
