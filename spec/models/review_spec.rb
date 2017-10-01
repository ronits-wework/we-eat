require 'rails_helper'

RSpec.describe Review, type: :model do

  describe "test average rating calculation" do
    restaurant = FactoryGirl.create(:restaurant)
    i = 0
    reviews_num = rand(50..200)
    reviews = []
    while i < reviews_num
      i += 1
      reviews << FactoryGirl.create(:review, restaurant: restaurant)
    end
    describe Review.where(restaurant_id: restaurant.id).average(:rating) do
      it { should be_within(0.001).of(restaurant.rating) }
    end
  end
end
