import csrfFetch from "./csrf";


const POPULATE_FOLLOWS = 'follow/populate';
const RECEIVE_FOLLOW = 'follow/receive';
const REMOVE_FOLLOW = 'follow/remove';
const REMOVE_FOLLOWS = 'follow/removeAll'

export const populateFollows = (initialFollows) => {
    return {
        type: POPULATE_FOLLOWS,
        follows: initialFollows
    }
}

export const receiveFollow = (follow) => {
    return {
        type: RECEIVE_FOLLOW,
        follow
    }
}

export const removeFollow = (followId) => {
    return {
        type: REMOVE_FOLLOW,
        followId
    }
}

export const clearFollows = () => {
    return {
        type: REMOVE_FOLLOWS
    }
}

export const getUserFollows = () => async (dispatch) => {
    const response = await csrfFetch('/api/follows');
    const initialFollows = await response.json();
    dispatch(populateFollows(initialFollows));
    return response;
}

export const createFollow = (follow) => async (dispatch) => {
    const { creatorId, followerId } = follow
    const response = await csrfFetch('/api/follows', {
        method: "POST",
        body: JSON.stringify({
            follow: {
                creatorId,
                followerId
            }
        })
    })
    const data = await response.json();
    if (response.ok){
        dispatch(receiveFollow(data))
    } else {
        return response
    }
    return data
}

export const deleteFollow = (followId) => async (dispatch) => {
    const response = await csrfFetch(`/api/follows/${followId}`, {
        method: "DELETE"
    })
    if (response.ok){
        dispatch(removeFollow(followId))
    }
    return response;
}

const followReducer = (state = {}, action ) => {
    let newState = { ...state }
    switch (action.type){
        case POPULATE_FOLLOWS:
            newState = { ...action.follows }
            return newState;
        case RECEIVE_FOLLOW:
            newState = { ...newState, ...action.follow }
            return newState;
        case REMOVE_FOLLOW:
            delete newState[action.followId]
            return newState;
        case REMOVE_FOLLOWS:
            newState = {}
            return newState;
        default:
            return state;
    }
};

export default followReducer;