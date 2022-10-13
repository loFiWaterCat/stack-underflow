# == Schema Information
#
# Table name: comments
#
#  id          :bigint           not null, primary key
#  author_id   :bigint
#  question_id :bigint
#  answer_id   :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Comment < ApplicationRecord
  validates :body, presence: true, length: { in: 15..30000}

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :question,
    foreign_key: :question_id,
    class_name: :Question,
    optional: true

  belongs_to :answer,
    foreign_key: :answer_id,
    class_name: :Answer,
    optional: true
    
end
