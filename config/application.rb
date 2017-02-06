require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)


module Marmoset
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    config.autoload_paths << Rails.root.join('app', 'graph')
    config.autoload_paths << Rails.root.join('app', 'graph', 'mutations')   # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths << Rails.root.join('app', 'graph', 'types')   # -- all .rb files in that directory are automatically loaded.
    GraphiQL::Rails.config.headers['Authorization'] = -> (context) {
      "Bearer #{context.cookies['_graphql_token']}"
    }
  end
end
