class LetterMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateLetter"
    input_field :subject, !types.String
    input_field :contents, !types.String
    input_field :list_id, !types.ID

    return_field :letter, LetterType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      type, list_id = GraphQL::Schema::UniqueWithinType.decode(inputs[:list_id])
      list = user.lists.find(list_id)
      letter = list.letters.create(subject: inputs[:subject], contents: inputs[:contents])

      {
        letter: letter
      }
    }
  end

  Update = GraphQL::Relay::Mutation.define do
    name "UpdateLetter"
    input_field :id, !types.ID
    input_field :subject, types.String
    input_field :contents, types.String
    input_field :sent, types.Boolean

    return_field :letter, LetterType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      type, id = GraphQL::Schema::UniqueWithinType.decode(inputs[:id])
      letter = Letter.find(id)
      list = user.lists.find(letter.list_id)
      valid_attributes = inputs.to_h.select{|key, input| inputs.key? key}.except('id')
      letter.update_attributes(valid_attributes)

      {
        letter: letter
      }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyLetter"
    input_field :id, !types.ID

    return_field :list, ListType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      type, id = GraphQL::Schema::UniqueWithinType.decode(inputs[:id])
      letter = Letter.find(id)
      list = user.lists.find(letter.list_id)
      letter.destroy

      {
        list: list
      }
    }
  end
end
