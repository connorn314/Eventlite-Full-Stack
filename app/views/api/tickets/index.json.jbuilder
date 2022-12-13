@tickets.each do |ticket|
    json.set! ticket.id do
        json.extract! ticket, :id, :name, :email, :event_id, :owner_id, :created_at
    end
end