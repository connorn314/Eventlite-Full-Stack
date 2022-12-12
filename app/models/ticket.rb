# == Schema Information
#
# Table name: tickets
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  email      :string           not null
#  event_id   :bigint           not null
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Ticket < ApplicationRecord

    before_validation
    validates :name, :email, :owner_id, :event_id, presence: { message: "%{attribute} can't be empty" }
    validate :ticket_available

    belongs_to :event,
        primary_key: :id,
        foreign_key: :event_id,
        class_name: :Event

    belongs_to :owner,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User

    def ticket_available
        @event = self.event
        # debugger
        if @event.tickets >= @event.tickets_allotted 
            errors.add :event_id, message: "not enough tickets available" 
        end
    end
        
end
