import csrfFetch from "./csrf";

const POPULATE_TICKETS = 'ticket/populate';
const RECEIVE_TICKET = 'ticket/receive';
const REMOVE_TICKET = 'ticket/remove';

export const populateTickets = (tickets) => {
    return {
        type: POPULATE_TICKETS,
        tickets
    }
}

export const receiveTicket = (ticket) => {
    return {
        type: RECEIVE_TICKET,
        ticket
    }
}

export const removeTicket = (ticketId) => {
    return {
        type: REMOVE_TICKET,
        ticketId
    }
}

export const getUserTickets = () => async (dispatch) => {
    const response = await csrfFetch('/api/tickets')
    const tickets = await response.json();
    dispatch(populateTickets(tickets));
    return response
}

export const createTicket = (ticket) => async (dispatch) => {
    const { name, email, eventId, ownerId } = ticket
    const response = await csrfFetch('/api/tickets', {
        method: "POST",
        body: JSON.stringify({
            ticket: {
                name, 
                email,
                eventId,
                ownerId
            }
        })
    })

    const data = await response.json();

    if (response.ok) {
        dispatch(receiveTicket(data))
    } else {
        return response
    }
    return data
}

const ticketReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case POPULATE_TICKETS:
            newState = { ...action.tickets }
            return newState;
        case RECEIVE_TICKET:
            newState = { ...newState, ...action.ticket }
            return newState;
        default:
            return state;

    }
};

export default ticketReducer