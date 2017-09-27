FactoryGirl.define do
  factory :review do
    name "MyString"
    rating 1
    comment "MyText"
    association :restaurant, factory: :restaurant
  end
end
