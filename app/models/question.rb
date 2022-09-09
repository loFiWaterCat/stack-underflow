# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  title      :string           not null
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Question < ApplicationRecord
  validates :title, :body, :author_id, presence: true
  validates :title, length: { in: 3..150 }, uniqueness: true
  validates :body, length: { in: 0..30000 }

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  has_many :answers,
    foreign_key: :question_id,
    class_name: :Answer,
    dependent: :destroy
end
