class ListsController < ApplicationController
  skip_before_action :authenticate, only: [:show]
  def create
    @list = current_user.lists.build(list_params)
    if @list.save
      render json: @list
    else
      render json: {errors: @list.errors}, status: 400
    end
  end

  def index
    @lists = current_user.lists
    render json: @lists
  end

  def show
    @list = current_user.lists.find(params[:id])
    render json: @list
  end

  def update
    @list = current_user.lists.find(params[:id])
    if @list.update_attributes(list_params)
      render json: @list
    else
      render json: {errors: @list.errors}, status: 400
    end
  end

  def destroy
    @list = current_user.lists.find(params[:id])
    @list.destroy
    render json: @list
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end
end
