VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

class User < ApplicationRecord
  has_many :lists, dependent: :destroy
  has_many :letters, dependent: :destroy
  before_save {self.email = email.downcase}
  validates :email, presence: true,
    uniqueness: {case_sensitive: false},
    length: {maximum: 255},
    format: {with: VALID_EMAIL_REGEX}
  validates :password, presence: true, length: { minimum: 6 }
  has_secure_password

  def can_access?(obj)
    if obj.class == List || obj.class == Letter
      obj.user_id == self.id
    elsif obj.class == Subscriber
      List.find(obj.list_id).user_id == self.id
    else
      false
    end
  end
end
