Rails.application.routes.draw do
  root 'restaurants#index', as: 'restaurant_index'

  resources :restaurants
  resources :cuisine_types

  # Make every request to go to restaurants#index
  get '(*path)', to: 'restaurants#index'

end
