Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  #
  root "public#index"

  scope '/app' do
    root to: 'client#index'
    post '/login', to: "sessions#create"
    get "*path", to:"client#index"
  end

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  scope '/graphql' do
    post '/', to: 'graphql#create'
  end

  scope '/api' do
    resources :users
    resources :letters do
      get 'send'
    end
    resources :lists do
      resources :subscribers
    end
  end

  get "*path", to:"public#index"
end
