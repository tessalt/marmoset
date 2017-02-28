QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'Root of schema'

  field :lists do
    type types[ListType]
    resolve ResolveHelpers::assert_allowed_lists (-> (obj, args, ctx) {
      ctx[:current_user].lists
    })
  end

  field :list do
    type ListType
    argument :id, types.ID
    resolve ResolveHelpers::assert_allowed_object(-> (obj, args, ctx) {
      Schema::object_from_id(args[:id], ctx)
    })
  end

  field :letter do
    type LetterType
    argument :id, types.ID
    resolve ResolveHelpers::assert_allowed_object(-> (obj, args, ctx) {
      Schema::object_from_id(args[:id], ctx)
    })
  end

  field :publicList do
    type ListType

    argument :user_id, !types.ID
    argument :list_id, !types.ID

    resolve -> (obj, args, ctx) do
      user_id = ResolveHelpers::resolve_id(args[:user_id])
      list_id = ResolveHelpers::resolve_id(args[:list_id])
      User.find(user_id).lists.find(list_id)
    end
  end

  field :node, GraphQL::Relay::Node.field
end
