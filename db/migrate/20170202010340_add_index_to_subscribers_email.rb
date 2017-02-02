class AddIndexToSubscribersEmail < ActiveRecord::Migration[5.0]
  def change
    add_index :subscribers, :email, unique: true
  end
end
