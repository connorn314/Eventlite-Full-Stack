
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
    if (response.ok){
        dispatch(receiveEvent(data))
        return data;
    }
    return response;
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
    const { title, description, location, startDate, endDate, photoFile } = createdEvent
    const authorId = JSON.parse(sessionStorage.currentUser).id
    const formData = new FormData();
    formData.append('event[authorId]', authorId)
    formData.append('event[title]', title)
    formData.append('event[description]', description)
    formData.append('event[location]', location)
    formData.append('event[startDate]', startDate)
    formData.append('event[endDate]', endDate)
    if (photoFile) {
        formData.append('event[photo]', photoFile)
    }
    const response = await csrfFetch("/api/events", {
        method: "POST",
        body: formData
    })

    const data = await response.json()

    if (response.ok){
        dispatch(receiveEvent(data))
    } else {
        return response
    }
    return data;
};

export const editEvent = (editedEvent) => async (dispatch) => {
    const { id, title, description, location, startDate, endDate, photoFile } = editedEvent
    const authorId = JSON.parse(sessionStorage.currentUser).id
    const formData = new FormData();
    formData.append('event[authorId]', authorId)
    formData.append('event[title]', title)
    formData.append('event[description]', description)
    formData.append('event[location]', location)
    formData.append('event[startDate]', startDate)
    formData.append('event[endDate]', endDate)
    if (photoFile) {
        formData.append('event[photo]', photoFile)
    }
    debugger
    const response = await csrfFetch(`/api/events/${id}`, {
        method: "PATCH",
        body: formData
    })

    const data = await response.json()
    
    if (response.ok){
        dispatch(receiveEvent(data))
    } else {
        return response
    }
    return data;
};

export const deleteEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: "DELETE"
    })
    if (response.ok){
        dispatch(removeEvent(eventId))
    }
    return response;
}

const eventReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type){
        case POPULATE_EVENTS:
            newState = { ...action.events }
            return newState;
        case RECEIVE_EVENT:
            newState = { ...newState, ...action.createdEvent }
            return newState;
        case REMOVE_EVENT:
            delete newState[action.eventId]
            return newState
        default:
            return state
    }
};

export default eventReducer