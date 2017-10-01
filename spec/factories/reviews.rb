FactoryGirl.define do
  factory :review do
    name { Faker::Name.name }
    rating { Faker::Number.between(0, 3) }
    comment { Faker::Lorem.sentence }
    association :restaurant, factory: :restaurant
  end
end
