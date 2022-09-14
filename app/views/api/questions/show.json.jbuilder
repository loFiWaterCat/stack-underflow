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
