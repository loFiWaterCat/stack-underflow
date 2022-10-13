class Api::CommentsController < ApplicationController
  wrap_parameters include: Question.attribute_names + ['userId'] + ['questionId'] + ['answerId'] + ['body']

  def create
    @question = Question.find_by_id(params[:question_id])
    @comment = Comment.new(comment_params)

    if @comment.save!
      render 'api/questions/show'
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @comment = Comment.find_by_id(params[:id])
    if @comment.update!(comment_params)
      render '/api/comments/show'
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find_by_id(params[:id])
    @question = @comment.question
    @comment.destroy
    render '/api/questions/show'
  end

  private
  def comment_params
    params.require(:comment).permit(:author_id, :question_id, :answer_id, :body, :created_at, :updated_at)
  end
end
