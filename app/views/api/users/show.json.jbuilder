
json.set! @user.id do
    json.extract! @user, :id, :username
    json.eventIds @user.event_ids
    json.followers @user.follows.count
end