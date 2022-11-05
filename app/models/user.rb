# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

    before_validation :ensure_session_token
    has_secure_password
    # no longer need password=(), replaces is_password?() with authenticate(), 
    # adds a presence validation, adds password_confirmation

    validates :username, 
        uniqueness: true, 
        length: { in: 3..30 }, 
        format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email, 
        uniqueness: true, 
        length: { in: 3..255 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true
    validates :password_digest, presence: true


    has_many :events,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Event,
        dependent: :destroy

    has_many :likes,
        primary_key: :id,
        foreign_key: :liker_id,
        class_name: :Like,
        dependent: :destroy

    has_many :liked_events,
        through: :likes,
        source: :event
    
    def self.find_by_credentials(credential, password)

        query = {username: credential}
        if URI::MailTo::EMAIL_REGEXP.match?(credential)
            query = {email: credential}
        end
        @user = User.find_by(query)
        if @user && @user.authenticate(password)
            @user
        else
            nil
        end 
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end
    
    
end
