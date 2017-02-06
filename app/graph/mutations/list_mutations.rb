class ListMutations

  Create = GraphQL::Relay::Mutation.define do
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
end
