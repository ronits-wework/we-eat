Rails.application.routes.draw do
  root 'restaurants#index', as: 'restaurant_index'
  resources :reviews
  resources :cuisine_types
  resources :restaurants
  resources :restaurant_cuisines
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
