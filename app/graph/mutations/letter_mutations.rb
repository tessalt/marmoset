class LetterMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateLetter"
    input_field :subject, !types.String
    input_field :contents, !types.String
    input_field :list_id, !types.ID

    return_field :letters, types[LetterType]

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      list = Schema::object_from_id(inputs[:list_id], ctx)
      if user.can_access?(list)
        letter = user.letters.create(subject: inputs[:subject], contents: inputs[:contents], list_id: list.id)
        letters = user.letters
        {
          letters: letters
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
    input_field :list_id, types.ID
    input_field :sent, types.Boolean

    return_field :letter, LetterType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      letter = Schema::object_from_id(inputs[:id], ctx)
      if user.can_access?(letter)
        valid_attributes = inputs.to_h.select{|key, input| inputs.key? key}.except('id', 'list_id')
        if inputs[:list_id]
          list = Schema::object_from_id(inputs[:list_id], ctx)
          valid_attributes.push({list_id: list.id})
        end
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

    return_field :user, UserType

    resolve -> (object, inputs, ctx) {
      user = ctx[:current_user]
      letter = Schema::object_from_id(inputs[:id], ctx)
      if user.can_access?(letter)
        letter.destroy

        {
          user: user
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
