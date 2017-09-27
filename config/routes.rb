Rails.application.routes.draw do
  resources :cuisine_types
  resources :restaurants
  resources :restaurant_cuisines
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
