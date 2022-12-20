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
#  quantity   :bigint           not null
#
class Ticket < ApplicationRecord

    before_validation
    validates :name, :email, :owner_id, :event_id, presence: { message: "%{attribute} can't be empty" }
    validates :quantity, 
        inclusion: { in: 1..10, message: "Between 1 and 10 tickets can be purchased at a time" },
        presence: { message: "%{attribute} can't be empty" }

    validate :ticket_available, :not_owners_event

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
        tickets_s = @event.tickets.length > 0 ? @event.tickets.inject(0) { |acc, ticket| acc + ticket.quantity } : 0
        if @event.tickets_allotted - tickets_s <= self.quantity
            errors.add :event_id, message: "Not enough tickets available" 
        end
    end

    def not_owners_event
        @event = self.event
        if @event.author_id == self.owner_id
            errors.add :owner, message: "User cannot buy ticket to their own event"
        end
    end
        
end
