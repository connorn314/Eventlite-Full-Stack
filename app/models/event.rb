# == Schema Information
#
# Table name: events
#
#  id               :bigint           not null, primary key
#  author_id        :bigint           not null
#  title            :string           not null
#  description      :string
#  location         :string           not null
#  start_date       :datetime         not null
#  end_date         :datetime         not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  price            :bigint           not null
#  tickets_allotted :bigint           not null
#

#checkout Time.zone


class Event < ApplicationRecord

    validates :author_id, :location, :start_date, :end_date, :price, :tickets_allotted, presence: { message: "%{attribute} can't be empty" }
    validates :title, 
        length: { maximum: 250 }
    validates :start_date, comparison: { less_than: :end_date, message: "End date must be after start date" }
    has_one_attached :photo

    belongs_to :creator,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    has_many :likes,
        primary_key: :id,
        foreign_key: :event_id,
        class_name: :Like,
        dependent: :destroy

    private

end
