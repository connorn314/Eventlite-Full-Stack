# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'

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

User.create!(
    username: 'International Chocolate Salon', 
    email: 'Choco@user.io', 
    password: 'password'
)

User.create!(
    username: 'Funcheap', 
    email: 'funcheap@user.io', 
    password: 'password'
)

User.create!(
    username: 'SET UNDERGROUND', 
    email: 'setunder@user.io', 
    password: 'password'
)

User.create!(
    username: 'Tech Career Fair', 
    email: 'tcf@user.io', 
    password: 'password'
)

User.create!(
    username: 'CrawlSF', 
    email: 'crawlsf@user.io', 
    password: 'password'
)

User.create!(
    username: 'SF Comedy', 
    email: 'sfc@user.io', 
    password: 'password'
)

User.create!(
    username: 'Dance Party Nation', 
    email: 'DP@user.io', 
    password: 'password'
)

User.create!(
    username: 'Beer Olympics HQ', 
    email: 'bohq@user.io', 
    password: 'password'
)

User.create!(
    username: 'Craft Hospitality LLC', 
    email: 'CHLLC@user.io', 
    password: 'password'
)



# More users
# 10.times do 
#     User.create!({
#     username: Faker::Internet.unique.username(specifier: 3),
#     email: Faker::Internet.unique.email,
#     password: 'password'
#     }) 
# end

puts "Creating events..."


# Create events
event1 = Event.create!(
    author_id: 1, 
    title: 'Alice in Wonderland Tea Party', 
    description: 'Dress up like your favorite AIW character and join others in SF for some Tea!',
    location: 'Dolores Park, San Francisco',
    start_date: '2022-11-28 10:15:00 -0800',
    end_date: '2022-11-28 15:15:00 -0800',
    price: 20,
    tickets_allotted: 100
)
    
tea_party_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/tea+copy.png')
event1.photo.attach(io: tea_party_pic, filename: 'tea_party_pic.png')

event2 = Event.create!(
    author_id: 10, 
    title: 'San Francisco Coffee Festival 2022', 
    description: 'The 6th Annual San Francisco Coffee Festival® kicks off Saturday, November 12, 2022 and Sunday, November 13, 2022.',
    location: 'Fort Mason Center, San Francisco',
    start_date: '2022-11-12 09:00:00 -0800',
    end_date: '2022-11-13 16:30:00 -0800',
    price: 10,
    tickets_allotted: 100
)

coffee_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/coffee+copy.png')
event2.photo.attach(io: coffee_pic, filename: 'coffee_pic.png')

event3 = Event.create!(
    author_id: 8, 
    title: 'Battle of the Decades : Dance Party', 
    description: "If you know you know.... SF's most popular Friday happy hour... DJ's, Dancing, Nostalgia, and drink prices too good to be true. Oh its true.",
    location: 'Monroe, San Francisco',
    start_date: '2022-11-11 17:00:00 -0800',
    end_date: '2022-11-12 02:00:00 -0800',
    price: 15,
    tickets_allotted: 100
)

party_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/party+copy.png')
event3.photo.attach(io: party_pic, filename: 'party_pic.png')

event4 = Event.create!(
    author_id: 2, 
    title: 'Fall Holiday CHOCOLATE SALON 2022', 
    description: 'Discover, taste and savor the finest in artisan, gourmet and premium chocolates & confections for the Season and the Holidays.',
    location: 'San Francisco County Fair Building, San Francisco',
    start_date: '2022-11-20 11:00:00 -0800',
    end_date: '2022-11-29 16:30:00 -0800',
    price: 30,
    tickets_allotted: 100
)

chocolate_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/chocolate+copy.png')
event4.photo.attach(io: chocolate_pic, filename: 'chocolate_pic.png')

event5 = Event.create!(
    author_id: 9, 
    title: "SF's Novemberfest Beer & Comedy Festival 2022 at Speakeasy Brewery", 
    description: "San Francisco's iconic Speakeasy Brewery throws open its doors for a month-long pop-up indoor/outdoor comedy fest w/ $5 pints & rare flavors",
    location: "Speakeasy Ales & Lagers, San Francisco",
    start_date: '2022-11-11 20:00:00 -0800',
    end_date: '2022-11-18 20:00:00 -0800',
    price: 10,
    tickets_allotted: 100
)

november_fest = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/Screen+Shot+2022-11-11+at+8.23.59+AM.png')
event5.photo.attach(io: november_fest, filename: 'november_fest.png')

event6 = Event.create!(
    author_id: 5, 
    title: 'Career Fair: Exclusive Tech Hiring Event', 
    description: "Tech Career Fair focus on helping companies achieve their diversity and inclusivity initiative with more diverse non-traditional candidates",
    location: 'Moved to Virtual Event, San Francisco',
    start_date: '2022-12-16 09:00:00 -0800',
    end_date: '2022-12-16 12:00:00 -0800',
    price: 50,
    tickets_allotted: 100
)

tech_hire = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/Screen+Shot+2022-11-11+at+8.31.10+AM.png')
event6.photo.attach(io: tech_hire, filename: 'tech_hire.png')

event7 = Event.create!(
    author_id: 4, 
    title: 'SET w/ JOHN DIGWEED (Bedrock) + KORA (Saisons/Anjunadeep)', 
    description: "SET Underground returns to Public Works with our good friends John Digweed & Kora",
    location: 'Public Works SF, San Francisco',
    start_date: '2022-12-03 22:00:00 -0800',
    end_date: '2022-12-04 04:00:00 -0800',
    price: 20,
    tickets_allotted: 100
)

digweed = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/Screen+Shot+2022-11-11+at+8.34.58+AM.png')
event7.photo.attach(io: digweed, filename: 'digweed.png')

event8 = Event.create!(
    author_id: 9, 
    title: 'Sweater-Con 2022: Ugly Sweater Pub Crawl', 
    description: "The Official San Francisco Ugly Sweater Pub Crawl",
    location: 'Mayes Oyster House, San Francisco',
    start_date: '2022-12-03 16:00:00 -0800',
    end_date: '2022-12-03 22:00:00 -0800',
    price: 20,
    tickets_allotted: 100
)

sweater_con = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/Screen+Shot+2022-11-11+at+8.38.18+AM.png')
event8.photo.attach(io: sweater_con, filename: 'sweater_con.png')

# event9 = Event.create!(
#     author_id: 2, 
#     title: 'Fall Holiday CHOCOLATE SALON 2022', 
#     description: 'Discover, taste and savor the finest in artisan, gourmet and premium chocolates & confections for the Season and the Holidays.',
#     location: 'San Francisco County Fair Building, San Francisco',
#     start_date: '2022-11-20 11:00:00',
#     end_date: '2022-11-29 16:30:00'
# )

# chocolate_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/chocolate+copy.png')
# event9.photo.attach(io: chocolate_pic, filename: 'chocolate_pic.png')

# event10 = Event.create!(
#     author_id: 2, 
#     title: 'Fall Holiday CHOCOLATE SALON 2022', 
#     description: 'Discover, taste and savor the finest in artisan, gourmet and premium chocolates & confections for the Season and the Holidays.',
#     location: 'San Francisco County Fair Building, San Francisco',
#     start_date: '2022-11-20 11:00:00',
#     end_date: '2022-11-29 16:30:00'
# )

# chocolate_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/chocolate+copy.png')
# event10.photo.attach(io: chocolate_pic, filename: 'chocolate_pic.png')

# event11 = Event.create!(
#     author_id: 2, 
#     title: 'Fall Holiday CHOCOLATE SALON 2022', 
#     description: 'Discover, taste and savor the finest in artisan, gourmet and premium chocolates & confections for the Season and the Holidays.',
#     location: 'San Francisco County Fair Building, San Francisco',
#     start_date: '2022-11-20 11:00:00',
#     end_date: '2022-11-29 16:30:00'
# )

# chocolate_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/chocolate+copy.png')
# event11.photo.attach(io: chocolate_pic, filename: 'chocolate_pic.png')

# event12 = Event.create!(
#     author_id: 2, 
#     title: 'Fall Holiday CHOCOLATE SALON 2022', 
#     description: 'Discover, taste and savor the finest in artisan, gourmet and premium chocolates & confections for the Season and the Holidays.',
#     location: 'San Francisco County Fair Building, San Francisco',
#     start_date: '2022-11-20 11:00:00',
#     end_date: '2022-11-29 16:30:00'
# )

# chocolate_pic = URI.open('https://eventlite-connor-seeds.s3.us-west-1.amazonaws.com/chocolate+copy.png')
# event12.photo.attach(io: chocolate_pic, filename: 'chocolate_pic.png')

puts "Creating likes..."

#Create likes

Like.create!(
    event_id: 2,
    liker_id: 1
)

Like.create!(
    event_id: 3,
    liker_id: 2
)

Like.create!(
    event_id: 2,
    liker_id: 5
)

Like.create!(
    event_id: 1,
    liker_id: 1
)

Like.create!(
    event_id: 4,
    liker_id: 9
)


puts "Creating follows..."

def generateFollows
    used_combos = []

    until used_combos.length == 50 do
        creator = rand(1..10)
        follower = rand(1..10)
    
        while creator == follower do
            creator = rand(1..10)
        end

        next if used_combos.include?([creator, follower])
        
        Follow.create!(
            creator_id: creator,
            follower_id: follower
        )
        used_combos << [creator, follower]
    end
end

generateFollows


puts "Done!"
