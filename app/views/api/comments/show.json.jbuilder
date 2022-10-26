if @comment
  json.set! @comment.id do
  json.extract! @comment, :id, :author_id, :question_id, :answer_id, :body, :created_at, :updated_at
  end
end
