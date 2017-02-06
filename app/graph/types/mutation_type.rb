MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createList, field: ListMutations::Create.field
  field :updateList, field: ListMutations::Update.field
  field :destroyList, field: ListMutations::Destroy.field
end
