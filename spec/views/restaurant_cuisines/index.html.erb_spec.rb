require 'rails_helper'

RSpec.describe "restaurant_cuisines/index", type: :view do
  before(:each) do
    assign(:restaurant_cuisines, [
      RestaurantCuisine.create!(),
      RestaurantCuisine.create!()
    ])
  end

  it "renders a list of restaurant_cuisines" do
    render
  end
end
