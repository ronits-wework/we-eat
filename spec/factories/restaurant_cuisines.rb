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
    association :restaurant, factory: :restaurant
    association :cuisine_type, factory: :cuisine_type
  end
end
