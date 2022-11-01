
json.set! @event.id do
    json.extract! @event, :id, :author_id, :title, :description, :location, :start_date, :end_date
end