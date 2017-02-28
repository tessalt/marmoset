module ResolveHelpers
  def self.assert_allowed_lists (resolve)
    -> (obj, args, ctx) {
      current_user = ctx[:current_user]
      if current_user
        resolve.call(obj, args, ctx)
      else
        GraphQL::ExecutionError.new('must be logged in')
      end
    }
 end

  def self.assert_allowed_object (resolve)
    -> (obj, args, ctx) {
      current_user = ctx[:current_user]
      if current_user
        object = resolve.call(obj, args, ctx)
        if current_user.can_access?(object)
          object
        else
          GraphQL::ExecutionError.new('insufficent permissions')
        end
      else
        GraphQL::ExecutionError.new('must be logged in')
      end
    }
  end

  def self.resolve_id (id)
    type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    item_id
  end
end
