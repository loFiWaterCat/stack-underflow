# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Question.destroy_all
  Answer.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('questions')
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )


  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  Question.create!(
    author_id: 1, 
    title: 'How to build a website',
    body: 'Ok, hear me out. I have a million dollar idea. Just need somebody to make a website for me'
  )

  Question.create!(
    author_id: 1,
    title: 'Recruiting fullstack developers',
    body: 'Paying with exposure',
  )

  Question.create!(
    author_id: 3,
    title: 'Hello Everyone!',
    body: "I've been trying to reach you about your extended car warrenty"
  )

  Answer.create!(
    author_id: 2,
    question_id: 1,
    body: 'Heard this one before. Do it yourself'
  )

  Answer.create!(
    author_id: 4,
    question_id: 2,
    body: 'I only take cash'
  )

  Answer.create!(
    author_id: 2,
    question_id: 2,
    body: 'Good thing exposure really fills me up'
  )

  puts "Done!"
end
