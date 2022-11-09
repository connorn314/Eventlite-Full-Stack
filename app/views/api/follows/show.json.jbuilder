json.set! @follow.id do
    json.extract! @follow, :id, :creator_id, :follower_id
end