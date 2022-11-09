@follows.each do |follow|
    json.set! follow.id do
        json.extract! follow, :id, :creator_id
    end
end