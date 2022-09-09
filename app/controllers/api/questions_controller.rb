class Api::QuestionsController < ApplicationController
  wrap_parameters include: Question.attribute_names + ['authorId']

  def index
    @questions = Question.all

    render :index
  end

  def show
    @question = Question.find_by_id(params[:id])
    @answers = @question.answers

    render :show
  end

  def create
    debugger
    @question = Question.new(question_params)

    if @question.save!
      render :show
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.require(:question).permit(:author_id, :title, :body, :created_at)
  end
end
