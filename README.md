# Eventlite
If you haven't already, visit the live site hosted on render! [Eventlite](https://eventlite.onrender.com/)

## Background
Eventlite is a single-page Eventbrite clone that elegantly merges both attendee and host features in to one cohesive user experience.

## Features

### User Authentication
* Secure password authentication for users with existing accounts, as well as users just signing up. 
* All usernames are unique, all passwords therefore have a uniqe username and email associated with them.
* Sign in with demo user to access certain features without having to create an account.
<img width="1304" alt="Screen Shot 2022-12-21 at 8 59 10 AM" src="https://user-images.githubusercontent.com/51464137/208963541-8eca6726-e9b1-4c74-ac98-bbf4ce1b671c.png">

### Event Postings
* Users can view details of an event by clicking on the event-item on the landing page.
<img width="1336" alt="Screen Shot 2022-12-21 at 9 15 12 AM" src="https://user-images.githubusercontent.com/51464137/208964939-0f17dc01-03d0-4342-ad1e-3d8c13efa545.png">
<img width="1333" alt="Screen Shot 2022-12-21 at 9 00 02 AM" src="https://user-images.githubusercontent.com/51464137/208964009-97591e09-44ab-46a0-bdfe-dfd6e9017364.png">
<img width="1346" alt="Screen Shot 2022-12-21 at 9 00 18 AM" src="https://user-images.githubusercontent.com/51464137/208964030-71aee4b6-805e-481a-a50c-c44e2dddafaf.png">

* Create events by filling in the details of the "Create an event" form and attaching a photo.
<img width="1440" alt="Screen Shot 2022-12-21 at 9 24 23 AM" src="https://user-images.githubusercontent.com/51464137/208966547-8ea89975-4b93-49d8-b89a-ceb9c0d76958.png">

* Edit and Delete events you've created by either clicking the prompt on that event's show page or navigating to the manage events page via the dropdown menu.
<img width="1148" alt="Screen Shot 2022-12-21 at 9 26 02 AM" src="https://user-images.githubusercontent.com/51464137/208966900-f29a1467-92c6-4d29-ac30-4b346e01da88.png">

### Tickets
* Get tickets to event using the "get tickets" button on all event show pages.
* Users cannot buy tickets to their own event, nor can they buy more than 10 tickets in a single order.
<img width="1438" alt="Screen Shot 2022-12-21 at 9 31 18 AM" src="https://user-images.githubusercontent.com/51464137/208967912-ccb38c42-8cba-4770-8539-7dfea617b53b.png">
<img width="1439" alt="Screen Shot 2022-12-21 at 9 31 33 AM" src="https://user-images.githubusercontent.com/51464137/208967935-2a8294b6-d46c-4fa3-82b1-d0a32af22a49.png">

* View a ticket order in your personal profile page which can be found 3 ways: tickets button, tickets drop down item, or following drop down item.
* Users can cancel their orders here as well
<img width="1429" alt="Screen Shot 2022-12-21 at 9 36 34 AM" src="https://user-images.githubusercontent.com/51464137/208968742-01848faf-335c-464f-9a81-728d51e3f1cd.png">
<img width="1432" alt="Screen Shot 2022-12-21 at 9 37 00 AM" src="https://user-images.githubusercontent.com/51464137/208968816-c1d16af8-5c59-4033-b720-565880ac4156.png">

### Likes
* Like events when logged in, either from the event show page or the event item on the landing page, a successful like will turn orange on completion.
* View all likes either on the liked page or the personal profile page.
<img width="1440" alt="Screen Shot 2022-12-21 at 9 41 20 AM" src="https://user-images.githubusercontent.com/51464137/208969597-d2479d9f-8afd-4a4d-9f0f-a14c8da259e7.png">


### Follows
* Follow users when logged in, either from one of that user's event show pages or from their own user profile page, a successful follow will turn blue on completion.
* View all follows from the personal profile page, which contains links to each of their user profile pages.
<img width="1438" alt="Screen Shot 2022-12-21 at 9 43 12 AM" src="https://user-images.githubusercontent.com/51464137/208970045-a99dec1f-3a89-4ade-bd04-2cba7a47eae5.png">
<img width="1434" alt="Screen Shot 2022-12-21 at 9 44 07 AM" src="https://user-images.githubusercontent.com/51464137/208970167-c839094c-e198-4aa0-8c59-ed9976ccd61c.png">


## Technologies
* React/Redux
* JavaScript/JBuilder/jQuery
* HTML/CSS3
* Ruby on Rails
* PostgreSQL
* AWS S3

## Code Snippets
### Jbuilder
```
@events.each do |event|
    json.set! event.id do
        json.extract! event, :id, :author_id, :title, :location, :start_date, :end_date, :price, :tickets_allotted
        json.photo_url url_for(event.photo)
        json.tickets_sold event.tickets.inject(0) { |acc, ticket| acc + ticket.quantity  }
    end
end
```
The above snippet is from the event index view page:
* Utilizes rails associations to format JSON responses from the backend that hold all relevant information needed for events
* Creates more efficient access to data and fewer fetches to the backend

### Custom Model Validation (Rails)
```    
belongs_to :event,
      primary_key: :id,
      foreign_key: :event_id,
      class_name: :Event
      
def ticket_available
    @event = self.event
    tickets_s = @event.tickets.length > 0 ? @event.tickets.inject(0) { |acc, ticket| acc + ticket.quantity } : 0
    if @event.tickets_allotted - tickets_s <= self.quantity
        errors.add :event_id, message: "Not enough tickets available" 
    end
end
```
The above snippet is from the ticket.rb model:
* Utilize ruby's association functionality with relational databases to set an instance variable "@event" to the tickets event.
* Make tickets_s equal to the sum of that events tickets (also an association) and their quanitities.
* Compare this tickets quantity to the tickets available for that event through a simple conditional, create error if condition is true.

### UseSelector, UseState Hook, and UseEffect Hook (React)
```
const eventEdit = useSelector(state => state.events[eventId]);
const [errors, setErrors] = useState([]);
const [title, setTitle] = useState(eventEdit.title);
const [location, setLocation] = useState(eventEdit.location);
const strt = new Date(eventEdit.startDate);
let endD = new Date(eventEdit.endDate);
const [description, setDescription] = useState("");

// ... inbetween code ... //

const [price, setPrice] = useState(eventEdit.price);
const [totalTickets, setTotalTickets] = useState(eventEdit.ticketsAllotted);


useEffect(() => {
    dispatch(eventActions.getOneEvent(eventId))
    .then(data => {
        setDescription(Object.values(data)[0].description)
    })
}, [])
```
The above snippet is from the event edit form:
* UseSelector - pulls event being edited from Redux global state.
* UseState - initializes each form input with the already existing values from the event pulled from state.
* UseEffect - description is initialized as an empty string, due to the fact that description only exists in state after a "getOneEvent" has been dispatched to the backend, this will cause an error then if we try to access that absent value on the first render. Instead we intialize it as empty, then the useEffect runs after the first render (dispatching "getOneEvent"), the response is guaranteed to contain the description which we then set description to using the UseState function created earlier.

