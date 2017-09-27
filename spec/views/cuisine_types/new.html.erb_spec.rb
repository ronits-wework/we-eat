require 'rails_helper'

RSpec.describe "cuisine_types/new", type: :view do
  before(:each) do
    assign(:cuisine_type, CuisineType.new(
      :cuisine => "MyString"
    ))
  end

  it "renders new cuisine_type form" do
    render

    assert_select "form[action=?][method=?]", cuisine_types_path, "post" do

      assert_select "input[name=?]", "cuisine_type[cuisine]"
    end
  end
end
