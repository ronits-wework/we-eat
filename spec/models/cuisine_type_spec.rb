# == Schema Information
#
# Table name: cuisine_types
#
#  id         :integer          not null, primary key
#  cuisine    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe CuisineType, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
