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

  def self.delivery_times
    [30, 60, 90, 120]
  end

  validates :name, :address, presence: true
  validates :speed, inclusion: { in: delivery_times }
  validates :name, length: { minimum: 2 }
  validates :rating, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }


end
