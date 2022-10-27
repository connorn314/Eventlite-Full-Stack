class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.bigint :author_id, null: false, index: true
      t.string :title, null: false, index: true
      t.string :description
      t.string :location, null: false, index: true
      t.timestamp :start_date, null: false
      t.timestamp :end_date, null: false
      t.timestamps
    end
    add_foreign_key :events, :users, column: :author_id, primary_key: :id
  end
end
