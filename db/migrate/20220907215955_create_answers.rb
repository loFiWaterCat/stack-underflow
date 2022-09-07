class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.references :author, foreign_key: { to_table: :users }, null: false
      t.references :question, foreign_key: true, null: false
      t.string :body, null: false


      t.timestamps
    end
  end
end
