Rails.application.routes.draw do

  resources :restaurants, only: [:index, :create, :show]
  resources :cuisine_types, only: [:index, :create, :show]
  resources :reviews, only: [:index, :create, :show]

  # Make every request to go to restaurants#index
  get '(*path)', to: 'restaurants#index'

end
