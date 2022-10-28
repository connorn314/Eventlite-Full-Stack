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
require 'byebug'

class Event < ApplicationRecord

    before_validation :ensure_timestamps, :sending
    validates :author_id, :location, presence: true
    validates :title, 
        length: { maximum: 250 }
    validates :start_date_raw, :end_date_raw, presence: true
    # validates :start_date, :end_date, presence: true
    validates :start_date, comparison: { less_than: :end_date, message: "End date must be after start date" }
    # validate :start_date_in_future

    belongs_to :creator,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    private

    def ensure_timestamps
        no_time_given = [0, 0, 0]
        self.start_date = convert_date_time(self.start_date_raw, self.start_time = no_time_given)
        self.end_date = convert_date_time(self.end_date_raw, self.end_time = no_time_given)
    end

    def sending
        check = [self.start_date, self.end_date]
        puts "hello"
    end

    def convert_date_time(date, time)
        # expecting date to be in the form [year, month, day]
        # expecting time to be in the form [hour, minute, second]
        return DateTime.new(date[0], date[1], date[2], time[0], time[1], time[2])
    end

    def start_date_in_future
        start = self.start_date
        current = Time.now
        self.errors.add(:start_date, "Start date must be in future") if start < current
    end

end
