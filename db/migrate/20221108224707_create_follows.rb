class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.bigint :creator_id, null: false
      t.bigint :follower_id, null: false
      t.timestamps
    end
    add_index :follows, [:creator_id, :follower_id], unique: true
    add_foreign_key :follows, :users, column: :creator_id, primary_key: :id
    add_foreign_key :follows, :users, column: :follower_id, primary_key: :id
  end
end
