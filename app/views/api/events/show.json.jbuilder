
json.set! @event.id do
    json.extract! @event, :id, :author_id, :title, :description, :location, :start_date, :end_date, :price, :tickets_allotted
    json.photo_url url_for(@event.photo)
    json.tickets_sold @event.tickets.inject(0) { |acc, ticket| acc + ticket.quantity  }
end

