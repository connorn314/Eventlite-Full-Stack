class CreateTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :tickets do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.bigint :event_id, null: false
      t.bigint :owner_id, null: false
      t.timestamps
    end
    add_foreign_key :tickets, :events, column: :event_id, primary_key: :id
    add_foreign_key :tickets, :users, column: :owner_id, primary_key: :id
  end
end
