
import csrfFetch from "./csrf";

const POPULATE_EVENTS = 'event/populate';
const RECEIVE_EVENT = 'event/receiveEvent';
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

export const getOneEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`);
    const data = await response.json();
    dispatch(receiveEvent(data[eventId]))
    return response
}


const receiveEvent = (createdEvent) => {
    return {
        type: RECEIVE_EVENT,
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
    const authorId = JSON.parse(sessionStorage.currentUser).id
    console.log(authorId)
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
    if (response.ok){
        const data = response.json()
        dispatch(receiveEvent(data))
    }
    return response;
};

const eventReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type){
        case POPULATE_EVENTS:
            newState = { ...action.events }
            return newState;
        case RECEIVE_EVENT:
            newState[action.createdEvent.id] = action.createdEvent
            return newState;
        case REMOVE_EVENT:
            delete newState.events[action.eventId]
            return newState
        default:
            return state
    }
};

export default eventReducer