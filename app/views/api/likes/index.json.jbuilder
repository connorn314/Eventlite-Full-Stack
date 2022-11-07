@likes.each do |like|
    json.set! like.id do
        json.extract! like, :id, :event_id, :liker_id
    end
end