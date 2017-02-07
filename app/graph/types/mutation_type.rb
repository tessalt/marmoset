MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :createList, field: ListMutations::Create.field
  field :updateList, field: ListMutations::Update.field
  field :destroyList, field: ListMutations::Destroy.field
  field :createSubscriber, field: SubscriberMutations::Create.field
  field :updateSubscriber, field: SubscriberMutations::Update.field
  field :destroySubscriber, field: SubscriberMutations::Destroy.field
end
