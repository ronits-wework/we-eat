require 'rails_helper'

RSpec.describe "reviews/edit", type: :view do
  before(:each) do
    @review = assign(:review, FactoryGirl.create(:review))
  end

  it "renders the edit review form" do
    render

    assert_select "form[action=?][method=?]", review_path(@review), "post" do

      assert_select "input[name=?]", "review[name]"

      assert_select "input[name=?]", "review[rating]"

      assert_select "textarea[name=?]", "review[comment]"

      assert_select "input[name=?]", "review[restaurant_id]"
    end
  end
end
