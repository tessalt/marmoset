class SubscribersController < ApplicationController
  def create
    @subscriber = current_user.lists.find(params[:list_id]).subscribers.build(subscriber_params)
    if @subscriber.save
      render json: @subscriber
    else
      render json: {errors: @subscriber.errors}, status: 400
    end
  end

  def index
    @subscribers = current_user.lists.find(params[:list_id]).subscribers
    render json: @subscribers
  end

  private

  def subscriber_params
    params.require(:subscriber).permit(:email)
  end
end
