class Review < ApplicationRecord
  belongs_to :restaurant

  validates :name, :rating, :comment, presence: true
  validates :name, length: { minimum: 2 }
  validates :rating, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }

end
