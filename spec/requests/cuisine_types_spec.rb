require 'rails_helper'

RSpec.describe "CuisineTypes", type: :request do
  describe "GET /cuisine_types" do
    it "works! (now write some real specs)" do
      get cuisine_types_path
      expect(response).to have_http_status(200)
    end
  end
end
