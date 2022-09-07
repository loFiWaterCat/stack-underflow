class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.references :author, foreign_key: { to_table: :users }, null: false
      t.string :title, null: false, index: { unique: true }
      t.string :body, null: false

      t.timestamps
    end
  end
end
