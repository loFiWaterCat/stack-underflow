json.questions do
  @questions.each do |question|
    json.set! question.id do
      json.extract! question, :id, :author_id, :title, :body, :created_at, :updated_at
    end
  end
end


json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
    end
  end
end

