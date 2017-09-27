require 'rails_helper'

RSpec.describe "restaurant_cuisines/edit", type: :view do
  before(:each) do
    @restaurant_cuisine = assign(:restaurant_cuisine, FactoryGirl.create(:restaurant_cuisine))
  end

  it "renders the edit restaurant_cuisine form" do
    render

    assert_select "form[action=?][method=?]", restaurant_cuisine_path(@restaurant_cuisine), "post" do
    end
  end
end
