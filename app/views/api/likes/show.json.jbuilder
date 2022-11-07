json.set! @like.id do
    json.extract! @like, :id, :event_id, :liker_id
end