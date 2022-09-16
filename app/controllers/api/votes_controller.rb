class Api::VotesController < ApplicationController
  wrap_parameters include: Question.attribute_names + ['userId'] + ['questionId'] + ['answerId'] + ['value']
  def index
    # Not doing anything
    @votes = Vote.all
  end

  def create
    @vote = Vote.new(vote_params)

    if @vote.save!
      render '/api/votes/show'
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @vote = Vote.find_by_id(params[:id])
    if @vote.update!(vote_params)
      render '/api/votes/show'
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @vote = Vote.find_by_id(params[:id])
    @question = @vote.question
    @answer = @vote.answer
    @vote.destroy
    render '/api/votes/show'
  end

  private
  def vote_params
    params.require(:vote).permit(:user_id, :question_id, :answer_id, :value)
  end
end

