Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index]
    resources :events, only: [:show, :index, :create, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :likes, only: [:index, :create, :destroy]
end


get '*path', to: "static_pages#frontend_index"
end
