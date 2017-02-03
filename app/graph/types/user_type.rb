UserType = GraphQL::ObjectType.define do
  name "User"

  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :email, !types.String
  field :password_digest, !types.String
  field :lists, types[ListTypes]
end
