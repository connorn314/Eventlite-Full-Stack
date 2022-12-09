class AddPriceAndTicketsToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :price, :bigint, null: false
    add_column :events, :tickets_allotted, :bigint, null: false
  end
end
