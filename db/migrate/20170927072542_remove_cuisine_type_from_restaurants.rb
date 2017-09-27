class RemoveCuisineTypeFromRestaurants < ActiveRecord::Migration[5.1]
  def change
    remove_column :restaurants, :cuisine_type
  end
end
