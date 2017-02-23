class Letter < ApplicationRecord
  belongs_to :list
  validates :list_id, presence: true
  validates :subject, presence: true
  validates :contents, presence: true
end
