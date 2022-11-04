# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Event.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('events')


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

    puts "Creating events..."


    # Create events
    event1 = Event.create!(
        author_id: 1, 
        title: 'Stand up Comedy Show', 
        description: 'Local comedians from bay area, also seen on hbo, netflix, and comedy central',
        location: 'San Francisco',
        start_date: '2022-11-28 15:15:00',
        end_date: '2022-11-29 15:15:00'
    )
        
    tea_party_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/tea+copy.png')
    event1.photo.attach(io: tea_party_pic, filename: 'tea_party_pic.png')

    event2 = Event.create!(
        author_id: 4, 
        title: 'Dance Party', 
        description: 'Amazing music, better dance moves, come enjoy!',
        location: 'San Francisco',
        start_date: '2022-11-04 15:15:00',
        end_date: '2022-11-04 19:15:00'
    )

    coffee_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/coffee+copy.png')
    event2.photo.attach(io: coffee_pic, filename: 'coffee_pic.png')

    event3 = Event.create!(
        author_id: 2, 
        title: 'Puppet Show', 
        description: 'The best puppeteers in the entirety of San Francisco gather to put on a show for the ages',
        location: 'San Francisco',
        start_date: '2022-11-10 15:15:00',
        end_date: '2022-11-10 21:15:00'
    )

    party_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/party+copy.png')
    event3.photo.attach(io: party_pic, filename: 'party_pic.png')

    event4 = Event.create!(
        author_id: 3, 
        title: 'Beer Olympics', 
        description: 'come one come all, must be 21+ years old to partake',
        location: 'San Francisco',
        start_date: '2022-11-28 11:15:00',
        end_date: '2022-11-29 15:15:00'
    )

    chocolate_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/chocolate+copy.png')
    event4.photo.attach(io: chocolate_pic, filename: 'chocolate_pic.png')

    puts "Done!"
end