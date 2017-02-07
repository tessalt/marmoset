Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  root to: 'client#index'
  post '/login', to: "sessions#create"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graph"
  end

  scope '/graph' do
    post '/', to: 'graphql#create'
  end

  resources :users
  resources :lists do
    resources :subscribers
  end
end
