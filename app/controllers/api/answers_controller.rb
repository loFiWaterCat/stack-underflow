class Api::AnswersController < ApplicationController
  def index
    # CURRENTLY NOt DOING ANYTHING
    @answers = Answers.all
  end

  private
  def answer_params 
    params.require(:answer).permit(:author_id, :question_id, :body, :created_at)
  end
end

