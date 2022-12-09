# == Schema Information
#
# Table name: follows
#
#  id          :bigint           not null, primary key
#  creator_id  :bigint           not null
#  follower_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Follow < ApplicationRecord

    validates :creator_id, :follower_id, presence: true
    validates :creator_id, uniqueness: { scope: :follower_id, message: "Creator can only be liked by a single user once" }
    
    belongs_to :creator,
        primary_key: :id,
        foreign_key: :creator_id,
        class_name: :User

    belongs_to :follower,
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :User
        
end
