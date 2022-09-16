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

  User.create!(
    username: 'unjammylammy',
    email: 'musicjimjam@yahoo.com',
    password: 'password'
  )

  User.create!(
    username: 'obama',
    email: 'barack@whitehouse.com',
    password: 'america'
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
    author_id: 2, 
    title: 'How to get started with a custom bass guitar?',
    body: "Hi, I've been playing bass for a while now and have been looking to get a custom build, but all the prices are too crazy! I've been looking at woodworking to make my own, but have no idea where to start. Would appreciate any advice!"
  )

  Question.create!(
    author_id: 1, 
    title: 'Recruiting fullstack developers',
    body: "Need a team to create this million dollar app I have in mind. I don't have much money, but I can give you exposure",
  )

  Question.create!(
    author_id: 3,
    title: 'How to convert an array of strings to numbers?',
    body: "Hi, I'm trying to convert an array of strings to numbers in javascript. Any help would be appreciated."
  )

  Answer.create!(
    author_id: 3,
    question_id: 2,
    body: "Don't think you'll find much help here"
  )

  Answer.create!(
    author_id: 4,
    question_id: 1,
    body: 'Woodworking is fun and another good hobby to get into, but you have to consider if the price and time investment is worth it. If you do not plan on doing more wood working in the future, it does not make sense to do all this work for just one guitar',
  )

  puts "Done!"
end
