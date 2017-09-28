# == Schema Information
#
# Table name: restaurants
#
#  id            :integer          not null, primary key
#  name          :string
#  rating        :integer
#  speed         :integer
#  accepts_10bis :boolean
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  address       :string
#

class Restaurant < ApplicationRecord

  has_many :restaurant_cuisines
  has_many :cuisine_types, through: :restaurant_cuisines
  has_many :reviews

  validates :name, :address, presence: true
  validates :speed, inclusion: { in: WeEat::DELIVERY_TIMES }
  validates :name, length: { minimum: 2 }
  validates :rating, numericality: { greater_than_or_equal_to: WeEat::MIN_REVIEW_RATING,
                                     less_than_or_equal_to: WeEat::MAX_REVIEW_RATING },
            allow_nil: true

  def set_rating_in_bounds!
    if self.rating != nil
      self.rating = [[self.rating, WeEat::MAX_REVIEW_RATING].min, WeEat::MIN_REVIEW_RATING].max
    end
  end

end
