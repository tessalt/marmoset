class GraphqlController < ApplicationController
  skip_before_action :authenticate

  def create
    begin
      context = {
        current_user: current_user,
        errors: []
      }
    rescue JWT::ExpiredSignature
      context = {
        current_user: nil,
        errors: ['user token expired']
      }
    end
    query_string = params[:query]
    query_variables = params[:variables]
    query = GraphQL::Query.new(Schema, query_string, variables: query_variables, context: context)
    render json: query.result
  end
end
