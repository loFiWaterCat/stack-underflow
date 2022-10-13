json.question do
  json.extract! @question, :id, :author_id, :title, :body, :created_at, :updated_at
end

if @answers
  json.answers do
    @answers.each do |answer|
      json.set! answer.id do
        json.extract! answer, :id, :question_id, :author_id, :body, :created_at, :updated_at
      end
    end
  end
end

if @users
  json.users do
    @users.each do |user|
      json.set! user.id do
        json.extract! user, :id, :username
      end
    end
  end
end

if @votes
  json.votes do
    @votes.each do |vote|
      json.set! vote.id do
        json.extract! vote, :id, :user_id, :question_id, :answer_id, :value
      end
    end
  end
end

if @comments
  json.comments do
    @comments.each do |comment|
      json.set! comment.id do
        json.extract! comment, :id, :author_id, :question_id, :answer_id, :body, :created_at, :updated_at
      end
    end
  end
end
