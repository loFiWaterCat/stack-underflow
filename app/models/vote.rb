# == Schema Information
#
# Table name: votes
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  question_id :bigint
#  answer_id   :bigint
#  value       :boolean          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Adding a comment
class Vote < ApplicationRecord
  validates :value, inclusion: { in: [ true, false ] }

  belongs_to :user,
    foreign_key: :user_id,
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
