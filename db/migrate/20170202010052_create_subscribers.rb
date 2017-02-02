class CreateSubscribers < ActiveRecord::Migration[5.0]
  def change
    create_table :subscribers do |t|
      t.string :email
      t.references :list, foreign_key: true
      t.timestamps
    end
  end
end
