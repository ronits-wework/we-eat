require "rails_helper"

RSpec.describe RestaurantCuisinesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/restaurant_cuisines").to route_to("restaurant_cuisines#index")
    end

    it "routes to #new" do
      expect(:get => "/restaurant_cuisines/new").to route_to("restaurant_cuisines#new")
    end

    it "routes to #show" do
      expect(:get => "/restaurant_cuisines/1").to route_to("restaurant_cuisines#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/restaurant_cuisines/1/edit").to route_to("restaurant_cuisines#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/restaurant_cuisines").to route_to("restaurant_cuisines#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/restaurant_cuisines/1").to route_to("restaurant_cuisines#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/restaurant_cuisines/1").to route_to("restaurant_cuisines#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/restaurant_cuisines/1").to route_to("restaurant_cuisines#destroy", :id => "1")
    end

  end
end
