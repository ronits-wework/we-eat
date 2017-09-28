class ChangeRestaurantRatingToDecimal < ActiveRecord::Migration[5.1]
  def up
    change_column :restaurants, :rating, :decimal, precision: 8, scale: 2
  end

  def down
    change column :restaurants, :rating, :integer
  end
end
