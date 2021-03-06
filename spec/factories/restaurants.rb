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

FactoryGirl.define do
  factory :restaurant do
    name { Faker::Name.title }
    rating nil
    speed { WeEat::DELIVERY_TIMES.sample }
    address { Faker::Address }
  end
end
