class ListMutations

  Create = GraphQL::Relay::Mutation.define do
    name "CreateList"
    input_field :name, !types.String

    return_field :list, ListType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      list = user.lists.create!(name: inputs[:name])

      {
        list: list
      }
    }
  end

  Update = GraphQL::Relay::Mutation.define do
    name "UpdateList"
    input_field :id, !types.ID
    input_field :name, !types.String

    return_field :list, ListType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      type, id = GraphQL::Schema::UniqueWithinType.decode(inputs[:id])
      list = user.lists.find(id)
      list.update_attributes(name: inputs[:name])

      {
        list: list
      }
    }
  end
end
