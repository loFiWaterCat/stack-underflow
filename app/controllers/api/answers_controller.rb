class Api::AnswersController < ApplicationController
  wrap_parameters include: Question.attribute_names + ['authorId'] + ['questionId']
  def index
    # CURRENTLY NOt DOING ANYTHING
    @answers = Answers.all
  end

  def create
    @question = Question.find_by_id(params[:question_id])
    @answer = Answer.new(answer_params)

    if @answer.save!
      render '/api/questions/show'
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @answer = Answer.find_by_id(params[:id])
    if @answer.update!(answer_params)
      render '/api/questions/show'
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @answer = Answer.find_by_id(params[:id])
    @question = @answer.question
    @answer.destroy
    render '/api/questions/show'
  end

  private
  def answer_params 
    params.require(:answer).permit(:author_id, :question_id, :body, :created_at)
  end
end
