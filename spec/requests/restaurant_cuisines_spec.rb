require 'rails_helper'

RSpec.describe "RestaurantCuisines", type: :request do
  describe "GET /restaurant_cuisines" do
    it "works! (now write some real specs)" do
      get restaurant_cuisines_path
      expect(response).to have_http_status(200)
    end
  end
end
