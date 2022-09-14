class Api::QuestionsController < ApplicationController
  wrap_parameters include: Question.attribute_names + ['authorId']

  def index
    @questions = Question.all
    @users = []
    @questions.each do |question|
      @users.push(question.author)
    end

    render :index
  end

  def show
    @question = Question.find_by_id(params[:id])
    @answers = @question.answers

    # Build the related users array
    @users = [@question.author]

    @answers.each do |answer|
      @users.push(answer.author)
    end

    render :show
  end

  def create
    @question = Question.new(question_params)

    if @question.save!
      render :show
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @question = Question.find_by_id(params[:id])
    if @question.update(question_params)
      render :show
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @question = Question.find_by_id(params[:id])
    @question.destroy
    head :no_content
  end

  private

  def question_params
    params.require(:question).permit(:author_id, :title, :body, :created_at)
  end
end
