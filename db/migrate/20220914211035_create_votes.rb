class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.references :user, foreign_key: true, null: false
      t.references :question, foregin_key: true
      t.references :answer, foreign_key: true
      t.boolean :value, null: false

      t.timestamps
    end
  end
end
