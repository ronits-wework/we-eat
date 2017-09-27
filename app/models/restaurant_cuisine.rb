# == Schema Information
#
# Table name: restaurant_cuisines
#
#  id              :integer          not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  restaurant_id   :integer
#  cuisine_type_id :integer
#

class RestaurantCuisine < ApplicationRecord
  belongs_to :restaurant
  belongs_to :cuisine_type
end
