json.extract! restaurant, :id, :name, :cuisine_type, :rating, :speed, :accepts_10bis, :created_at, :updated_at
json.url restaurant_url(restaurant, format: :json)
