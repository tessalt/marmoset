class GraphqlController < ApplicationController
  def create
    context = {
      current_user: current_user
    }
    query_string = params[:query]
    query_variables = params[:variables]
    query = GraphQL::Query.new(Schema, query_string, variables: query_variables, context: context)
    render json: query.result
  end
end
