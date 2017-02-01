VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

class User < ApplicationRecord
  before_save {self.email = email.downcase}
  validates :email, presence: true,
    uniqueness: {case_sensitive: false},
    length: {maximum: 255},
    format: {with: VALID_EMAIL_REGEX}
  validates :password, presence: true, length: { minimum: 6 }
  has_secure_password
end
