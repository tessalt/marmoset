Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/login', to: "sessions#create"

  resources :users
  resources :lists do
    resources :subscribers
  end
end
