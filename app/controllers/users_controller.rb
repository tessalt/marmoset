class UsersController < ApplicationController
  skip_before_action :authenticate, only: [:create, :show]

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      jwt = Auth.issue({user: @user.id})
      render json: {user: @user, jwt: jwt}
    else
      render json: {errors: @user.errors}, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
