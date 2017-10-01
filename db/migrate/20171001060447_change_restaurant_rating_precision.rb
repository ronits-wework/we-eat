class ChangeRestaurantRatingPrecision < ActiveRecord::Migration[5.1]
  def up
    change_column :restaurants, :rating, :decimal, precision: 32, scale: 30
  end

  def down
    change_column :restaurants, :rating, :decimal, precision: 8, scale: 2
  end
end
