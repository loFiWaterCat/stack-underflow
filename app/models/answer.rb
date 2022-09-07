# == Schema Information
#
# Table name: answers
#
#  id          :bigint           not null, primary key
#  author_id   :bigint           not null
#  question_id :bigint           not null
#  body        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Answer < ApplicationRecord
  validates :body, presence: true, length: { in: 0..30000 }

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :question,
    foreign_key: :question_id,
    class_name: :Question
end
