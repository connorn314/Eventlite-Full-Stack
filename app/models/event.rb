# == Schema Information
#
# Table name: events
#
#  id          :bigint           not null, primary key
#  author_id   :bigint           not null
#  title       :string           not null
#  description :string
#  location    :string           not null
#  start_date  :datetime         not null
#  end_date    :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

#checkout Time.zone


class Event < ApplicationRecord

    validates :author_id, :location, :start_date, :end_date, presence: { message: "%{attribute} can't be empty" }
    validates :title, 
        length: { maximum: 250 }
    validates :start_date, comparison: { less_than: :end_date, message: "End date must be after start date" }
    has_one_attached :photo

    belongs_to :creator,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    private

end
