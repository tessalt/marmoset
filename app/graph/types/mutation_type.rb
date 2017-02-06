MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createList, field: ListMutations::Create.field
end
