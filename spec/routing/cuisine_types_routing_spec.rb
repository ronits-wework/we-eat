require "rails_helper"

RSpec.describe CuisineTypesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/cuisine_types").to route_to("cuisine_types#index")
    end

    it "routes to #new" do
      expect(:get => "/cuisine_types/new").to route_to("cuisine_types#new")
    end

    it "routes to #show" do
      expect(:get => "/cuisine_types/1").to route_to("cuisine_types#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/cuisine_types/1/edit").to route_to("cuisine_types#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/cuisine_types").to route_to("cuisine_types#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/cuisine_types/1").to route_to("cuisine_types#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/cuisine_types/1").to route_to("cuisine_types#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/cuisine_types/1").to route_to("cuisine_types#destroy", :id => "1")
    end

  end
end
