class SubscribersController < ApplicationController
  def create
    @subscriber = list.subscribers.build(subscriber_params)
    if @subscriber.save
      render json: @subscriber
    else
      render json: {errors: @subscriber.errors}, status: 400
    end
  end

  def index
    @subscribers = list.subscribers
    render json: @subscribers
  end

  private

  def subscriber_params
    params.require(:subscriber).permit(:email)
  end

  private

  def list
    current_user.lists.find(params[:list_id])
  end
end
