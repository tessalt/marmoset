UserType = GraphQL::ObjectType.define do
  name "User"

  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :email, !types.String
  field :password_digest, !types.String
  field :lists, types[ListType]
  field :errors, types[types.String], "Reasons the object couldn't be created or updated" do
    resolve ->(obj, args, ctx) { obj.errors.full_messages }
  end
end
