class LettersController < ApplicationController
  def create
    @letter = list.letters.build(letter_params)
    if @letter.save
      render json: @letter
    else
      render json: {errors: @letter.errors}, status: 400
    end
  end

  def index
    @letters = list.letters
    render json: @letters
  end

  def show
    @letter = list.letters.find(params[:id])
    render json: @letter
  end

  def update
    @letter = list.letters.find(params[:id])
    if @letter.update_attributes(letter_params)
      render json: @letter
    else
      render json: {errors: @letter.errors}, status: 400
    end
  end

  def destroy
    @letter = list.letters.find(params[:id])
    @letter.destroy
    render json: @letter
  end

  private

  def letter_params
    params.require(:letter).permit(:subject, :contents))
  end

  def list
    current_user.lists.find(params[:list_id])
  end
end
