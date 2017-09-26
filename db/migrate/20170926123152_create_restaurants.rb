class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :cuisine_type
      t.integer :rating
      t.integer :speed
      t.boolean :accepts_10bis

      t.timestamps
    end
  end
end
