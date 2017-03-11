VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

class Subscriber < ApplicationRecord
  belongs_to :list
  before_save {self.email = email.downcase}
  validates :email, presence: true,
    length: {maximum: 255},
    format: {with: VALID_EMAIL_REGEX}
  validates :list_id, presence: true
  validates_uniqueness_of :email, scope: :list_id
end
