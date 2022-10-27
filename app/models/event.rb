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
require 'date'
#checkout Time.zone

class Event < ApplicationRecord

    validates :author_id, :location, presence: true
    validates :title, 
        length: { maximum: 250 }
    validates :start_date, :end_date, presence: true
    validates :start_date, comparison: { less_than: :end_date, message: "End date must be after start date" }
    # validate :start_date_in_future

    belongs_to :creator,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    private

    def start_date_in_future
        start = self.start_date
        current = Time.now
        self.errors.add(:start_date, "Start date must be in future") if start < current
    end

end
