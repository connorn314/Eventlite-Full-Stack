class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.bigint :event_id, null: false
      t.bigint :liker_id, null: false
      t.timestamps
    end
    add_index :likes, [:event_id, :liker_id], unique: true
    add_foreign_key :likes, :events, column: :event_id, primary_key: :id
    add_foreign_key :likes, :users, column: :liker_id, primary_key: :id
  end
end
