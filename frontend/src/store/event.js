
import csrfFetch from "./csrf";

const POPULATE_EVENTS = 'event/populate';
const RECIEVE_EVENT = 'event/receiveEvent';
const REMOVE_EVENT = 'event/removeEvent';

export const populateEvents = (initialEvents) => {
    return {
        type: POPULATE_EVENTS,
        events: initialEvents 
    }
}

export const getEventsData = () => async (dispatch) => {
    const response = await csrfFetch('/api/events');
    const initialEvents = await response.json();
    dispatch(populateEvents(initialEvents));
    return response
}


const receiveEvent = (createdEvent) => {
    return {
        type: RECIEVE_EVENT,
        createdEvent
    };
};

const removeEvent = (eventId) => {
    return {
        type: REMOVE_EVENT,
        eventId
    };
};

export const createEvent = (createdEvent) => async (dispatch) => {
    const { title, description, location, startDate, endDate } = createdEvent
    const authorId = sessionStorage.getItem("currentUser").id
    // console.log(authorId)
    const response = await csrfFetch("/api/events", {
        method: "POST",
        body: JSON.stringify({
            authorId,
            title,
            description,
            location,
            startDate,
            endDate
        })
    })
    // const data = await response.json();
    return response;
};



// console.log(getEventsData())


const eventReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type){
        case POPULATE_EVENTS:
            newState = { ...action.events }
            return newState;
        case RECIEVE_EVENT:
            newState.events[action.createdEvent.id] = action.createdEvent
            return newState;
        case REMOVE_EVENT:
            delete newState.events[action.eventId]
            return newState
        default:
            return state
    }
};

export default eventReducer