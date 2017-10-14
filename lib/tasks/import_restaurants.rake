require 'csv'
namespace :import_restaurants_csv do
  task :create_restaurants => :environment do
    require 'csv'

    csv_path = Rails.root.join('lib', 'assets', 'Restaurants-ALL.csv')
    CSV.foreach(csv_path, {encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all}) do |row|
      row = row.to_hash
      unless Restaurant.exists?(name: row[:name])
        is_kosher = row[:kosher] ? true : false
        speed = WeEat::DELIVERY_TIMES.sample
        restaurant = Restaurant.create!(name: row[:name], accepts_10bis: row[:'10bis'], address: row[:address],
                                        kosher: is_kosher, logo: row[:logo], longitude: row[:longitude],
                                        latitude: row[:latitude], speed: speed)
        unless CuisineType.exists?(cuisine: row[:cuisine])
          CuisineType.create!(cuisine: row[:cuisine])
        end
        cuisine = CuisineType.find_by_cuisine(row[:cuisine])
        RestaurantCuisine.create!(cuisine_type_id: cuisine.id, restaurant_id: restaurant.id)

        @reviews_num = Faker::Number.between(0, 5)
        @i = 0
        while @i < @reviews_num do
          Review.create!(name: Faker::Name.name, rating: Faker::Number.between(0, 3),
                         comment: Faker::Lorem.sentence, restaurant_id: restaurant.id);
          @i += 1
        end
      end
    end
  end

  task :empty_restaurants => :environment do
    Review.destroy_all
    RestaurantCuisine.destroy_all
    CuisineType.destroy_all
    Restaurant.destroy_all
  end
end