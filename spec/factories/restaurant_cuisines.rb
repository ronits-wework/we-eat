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

FactoryGirl.define do
  factory :restaurant_cuisine do
    restaurant nil
    cuisine_type nil
  end
end
