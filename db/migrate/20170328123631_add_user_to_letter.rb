class AddUserToLetter < ActiveRecord::Migration[5.0]
  def change
    add_reference :letters, :user, foreign_key: true
    add_column :letters, :list_id, :integer
  end
end
