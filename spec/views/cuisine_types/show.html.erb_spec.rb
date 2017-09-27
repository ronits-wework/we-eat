require 'rails_helper'

RSpec.describe "cuisine_types/show", type: :view do
  before(:each) do
    @cuisine_type = assign(:cuisine_type, CuisineType.create!(
      :cuisine => "Cuisine"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Cuisine/)
  end
end
