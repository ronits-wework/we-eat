require 'rails_helper'

RSpec.describe "cuisine_types/edit", type: :view do
  before(:each) do
    @cuisine_type = assign(:cuisine_type, CuisineType.create!(
      :cuisine => "MyString"
    ))
  end

  it "renders the edit cuisine_type form" do
    render

    assert_select "form[action=?][method=?]", cuisine_type_path(@cuisine_type), "post" do

      assert_select "input[name=?]", "cuisine_type[cuisine]"
    end
  end
end
