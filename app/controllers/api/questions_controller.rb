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
    @comments = @question.comments
    @votes = []

    # Build the related users array
    @users = [@question.author]

    # Build the related votes array
    if @question.votes
      @votes = @question.votes
    end

    # Add the users that answered
    # and the comments of the answers
    @answers.each do |answer|
      @users.push(answer.author)
      if answer.votes
        @votes += answer.votes
      end

      if answer.comments
        @comments += answer.comments
      end
    end

    @comments.each do |comment|
      @users.push(comment.author)
    end

    @users = @users.uniq


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
    params.require(:question).permit(:author_id, :title, :body, :created_at, :updated_at)
  end
end
