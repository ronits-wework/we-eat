# == Schema Information
#
# Table name: restaurants
#
#  id            :integer          not null, primary key
#  name          :string
#  rating        :integer
#  speed         :integer
#  accepts_10bis :boolean
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  address       :string
#

require 'spec_helper'

RSpec.describe Restaurant, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
