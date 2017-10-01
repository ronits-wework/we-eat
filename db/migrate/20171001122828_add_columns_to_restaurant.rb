class AddColumnsToRestaurant < ActiveRecord::Migration[5.1]
  def change
    add_column :restaurants, :logo, :text
    add_column :restaurants, :kosher, :boolean, default: false
    add_column :restaurants, :longitude, :decimal, precision: 9, scale: 6
    add_column :restaurants, :latitude, :decimal, precision: 9, scale: 6
  end
end
