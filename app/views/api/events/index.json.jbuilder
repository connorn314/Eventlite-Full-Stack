
@events.each do |event|
    json.set! event.id do
        json.extract! event, :id, :author_id, :title, :location, :start_date
    end
end