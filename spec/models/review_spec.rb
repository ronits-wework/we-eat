require 'rails_helper'

RSpec.describe Review, type: :model do

  let!(:restaurant) {FactoryGirl.create(:restaurant)}
  i = 0
  #reviews_num = rand(50..200)
  reviews_num = 1
  let!(:reviews) do
    reviews = []
    while i < reviews_num
      i += 1
      reviews << FactoryGirl.create(:review, restaurant: restaurant)
    end
    reviews
  end

  subject {reviews}


  # describe 'after_create' do
  #
  #   let!(:avg) { Review.where(restaurant_id: subject.first.restaurant.id).average(:rating) }
  #   it "should be the correct rating" do
  #     avg.should be_within(0.001).of(subject.first.restaurant.rating)
  #   end
  # end
  #
  #
  # describe "test average rating calculation" do
  #
  #   it "should be the correct rating" do
  #     reviews.first.rating = rand(0..3)
  #     reviews.first.save!
  #
  #     let!(:avg) { Review.where(restaurant_id: subject.first.restaurant.id).average(:rating) }
  #     avg.should be_within(0.001).of(subject.first.restaurant.rating)
  #   end
  # end
end
