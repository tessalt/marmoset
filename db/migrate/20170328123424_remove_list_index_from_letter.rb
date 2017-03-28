class RemoveListIndexFromLetter < ActiveRecord::Migration[5.0]
  def change
    remove_reference :letters, :list, foreign_key: true
  end
end
