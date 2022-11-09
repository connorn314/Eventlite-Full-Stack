@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username
        json.followers user.follows.count
    end
end