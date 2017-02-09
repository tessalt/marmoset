class GraphqlController < ApplicationController
  skip_before_action :authenticate

  def create
    begin
      if logged_in?
        context = {
          current_user: current_user
        }
        query_string = params[:query]
        query_variables = params[:variables]
        query = GraphQL::Query.new(Schema, query_string, variables: query_variables, context: context)
        render json: query.result
      else
        render json: {error: GraphQL::ExecutionError.new('please log in')}, status: 401
      end
    rescue JWT::ExpiredSignature
      render json: {error: GraphQL::ExecutionError.new('token expired')}, status: 401
    end
  end
end
