class LetterMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateLetter"
    input_field :subject, !types.String
    input_field :contents, !types.String
    input_field :list_id, !types.ID

    return_field :letter, LetterType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      list = Schema::object_from_id(inputs[:list_id], ctx)
      if user.can_access?(list)
        letter = list.letters.create(subject: inputs[:subject], contents: inputs[:contents])
        {
          letter: letter
        }
      else
        GraphQL::ExecutionError.new('insufficent permissions')
      end
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
      letter = Schema::object_from_id(inputs[:id], ctx)
      if user.can_access?(letter)
        valid_attributes = inputs.to_h.select{|key, input| inputs.key? key}.except('id')
        letter.update_attributes(valid_attributes)
        {
          letter: letter
        }
      else
        GraphQL::ExecutionError.new('insufficent permissions')
      end
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyLetter"
    input_field :id, !types.ID

    return_field :list, ListType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      letter = Schema::object_from_id(inputs[:id], ctx)
      if user.can_access?(letter)
        letter.destroy

        {
          list: list
        }
      else
        GraphQL::ExecutionError.new('insufficent permissions')
      end
    }
  end

  Send = GraphQL::Relay::Mutation.define do
    name "SendLetter"
    input_field :id, !types.ID
    return_field :letter, LetterType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      letter = Schema::object_from_id(inputs[:id], ctx)
      if user.can_access?(letter)
        ListMailer.letter(letter).deliver_now
        letter.update_attributes(sent: true)

        {
          letter: letter
        }
      else
        GraphQL::ExecutionError.new('insufficent permissions')
      end
    }
  end
end
