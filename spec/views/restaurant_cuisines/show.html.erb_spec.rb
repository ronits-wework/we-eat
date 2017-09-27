require 'rails_helper'

RSpec.describe "restaurant_cuisines/show", type: :view do
  before(:each) do
    @restaurant_cuisine = assign(:restaurant_cuisine, RestaurantCuisine.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
