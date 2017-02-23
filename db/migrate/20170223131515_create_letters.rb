class CreateLetters < ActiveRecord::Migration[5.0]
  def change
    create_table :letters do |t|
      t.string :subject
      t.text :contents
      t.boolean :sent, default: false
      t.references :list, foreign_key: true
      t.timestamps
    end
  end
end
