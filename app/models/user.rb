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
    
    def self.find_by_credentials(credential, password)
        # determine the field you need to query: 
        #   * `email` if `credential` matches `URI::MailTo::EMAIL_REGEXP`
        #   * `username` if not
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
        
        # find the user whose email/username is equal to `credential`
        
        # if no such user exists, return a falsey value
    
        # if a matching user exists, use `authenticate` to check the provided password
        # return the user if the password is correct, otherwise return a falsey value
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
