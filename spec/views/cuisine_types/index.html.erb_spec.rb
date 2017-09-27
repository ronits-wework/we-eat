require 'rails_helper'

RSpec.describe "cuisine_types/index", type: :view do
  before(:each) do
    assign(:cuisine_types, [
      CuisineType.create!(
        :cuisine => "Cuisine"
      ),
      CuisineType.create!(
        :cuisine => "Cuisine"
      )
    ])
  end

  it "renders a list of cuisine_types" do
    render
    assert_select "tr>td", :text => "Cuisine".to_s, :count => 2
  end
end
