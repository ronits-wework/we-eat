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

require 'rails_helper'

RSpec.describe RestaurantCuisine, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
