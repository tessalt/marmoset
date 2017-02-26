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

  field :letter do
    type LetterType
    argument :id, types.ID
    argument :list_id, types.ID
    resolve -> (obj, args, ctx) do
      list_type, list_id = GraphQL::Schema::UniqueWithinType.decode(args[:list_id])
      list = ctx[:current_user].lists.find(list_id)
      letter_type, letter_id = GraphQL::Schema::UniqueWithinType.decode(args[:id])
      list.letters.find(letter_id)
    end
  end

  field :node, GraphQL::Relay::Node.field
end
