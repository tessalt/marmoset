UserType = GraphQL::ObjectType.define do
  name "User"
  field :id, !types.ID
  field :email, !types.String
  field :password_digest, !types.String
  field :lists, types[ListTypes]
end
