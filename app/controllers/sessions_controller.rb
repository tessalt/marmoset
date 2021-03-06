class SessionsController < ApplicationController
  skip_before_action :authenticate

  def create
    user = User.find_by(email: auth_params[:email])
    if user
      if user.authenticate(auth_params[:password])
        jwt = Auth.issue({user: user.id})
        cookies['_graphql_token'] = jwt
        render json: {user: user}
      else
        render json: {error: "invalid"}, status: 401
      end
    else
      render json: {error: "not found"}, status: 404
    end
  end

  private

  def auth_params
    params.require(:auth).permit(:email, :password)
  end
end
