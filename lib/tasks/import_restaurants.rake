require 'csv'
namespace :import_restaurants_csv do
  task :create_restaurants => :environment do
    require 'csv'

    csv_path = Rails.root.join('lib', 'assets', 'Restaurants-ALL.csv')
    CSV.foreach(csv_path, { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all}) do |row|
      row = row.to_hash
      if Restaurant.exists?(name: row[:name])
        next
      end
      restaurant = Restaurant.create!(name: row[:name], accepts_10bis: row[:'10bis'], address: row[:address])
      unless CuisineType.exists?(cuisine: row[:cuisine])
        CuisineType.create!(cuisine: row[:cuisine])
      end
      cuisine = CuisineType.find_by_cuisine(row[:cuisine])
      RestaurantCuisine.create!(cuisine_type_id: cuisine.id, restaurant_id: restaurant.id)
    end
  end

  task :empty_restaurants => :environment do
    RestaurantCuisine.destroy_all
    CuisineType.destroy_all
    Restaurant.destroy_all
  end
end