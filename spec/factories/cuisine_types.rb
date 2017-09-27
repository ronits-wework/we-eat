# == Schema Information
#
# Table name: cuisine_types
#
#  id         :integer          not null, primary key
#  cuisine    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :cuisine_type do
    cuisine "MyString"
  end
end
