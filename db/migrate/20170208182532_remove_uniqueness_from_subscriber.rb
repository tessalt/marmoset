class RemoveUniquenessFromSubscriber < ActiveRecord::Migration[5.0]
  def change
    remove_index :subscribers, :email
  end
end
