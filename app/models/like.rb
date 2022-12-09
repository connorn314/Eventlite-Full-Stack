# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  event_id   :bigint           not null
#  liker_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord

    validates :event_id, :liker_id, presence: true
    validates :event_id, uniqueness: { scope: :liker_id, message: "Event can only be liked by a single user once"}

    belongs_to :liker,
        primary_key: :id,
        foreign_key: :liker_id,
        class_name: :User
    
    belongs_to :event,
        primary_key: :id,
        foreign_key: :event_id,
        class_name: :Event
end
