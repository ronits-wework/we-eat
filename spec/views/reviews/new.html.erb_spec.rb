require 'rails_helper'

RSpec.describe "reviews/new", type: :view do
  before(:each) do
    assign(:review, Review.new(
      :name => "MyString",
      :rating => 1,
      :comment => "MyText",
      :restaurant => nil
    ))
  end

  it "renders new review form" do
    render

    assert_select "form[action=?][method=?]", reviews_path, "post" do

      assert_select "input[name=?]", "review[name]"

      assert_select "input[name=?]", "review[rating]"

      assert_select "textarea[name=?]", "review[comment]"

      assert_select "input[name=?]", "review[restaurant_id]"
    end
  end
end
