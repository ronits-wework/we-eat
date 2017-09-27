# == Schema Information
#
# Table name: cuisine_types
#
#  id         :integer          not null, primary key
#  cuisine    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CuisineType < ApplicationRecord
  has_many :restaurant_cuisines
  has_many :restaurants, through: :restaurant_cuisines

  validates :cuisine, presence: true, length: { minimum: 2 }
end
