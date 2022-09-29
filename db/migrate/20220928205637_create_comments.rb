class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :author, foreign_key: { to_table: :users }, null: false
      t.references :question, foreign_key: true 
      t.references :answer, foreign_key: true
      t.string :body, null: false

      t.timestamps
    end
  end
end
