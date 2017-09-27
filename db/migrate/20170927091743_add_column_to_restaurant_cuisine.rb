class AddColumnToRestaurantCuisine < ActiveRecord::Migration[5.1]
  def change
    add_column :restaurant_cuisines, :restaurant_id, :integer
    add_column :restaurant_cuisines, :cuisine_type_id, :integer
  end
end
