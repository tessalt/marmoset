class List < ApplicationRecord
  belongs_to :user
  has_many :subscribers, dependent: :destroy
  validates :user_id, presence: true
  validates :name, presence: true, length: { maximum: 100 }
end
