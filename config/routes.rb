Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :show]
    resources :events, only: [:show, :index, :create, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :likes, only: [:index, :create, :destroy]
    resources :follows, only: [:index, :create, :destroy]
    resources :tickets, only: [:index, :show, :create, :destroy]
end


get '*path', to: "static_pages#frontend_index"
end
