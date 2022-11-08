import csrfFetch from "./csrf";

const POPULATE_LIKES = 'like/populate';
const RECEIVE_LIKE = 'like/receive';
const REMOVE_LIKE = 'like/remove';

export const populateLikes = (initialLikes) => {
    return {
        type: POPULATE_LIKES,
        likes: initialLikes
    }
}

export const receiveLike = (like) => {
    return {
        type: RECEIVE_LIKE,
        like
    }
} 

export const removeLike = (likeId) => {
    return {
        type: REMOVE_LIKE,
        likeId
    }
}

export const getUserLikes = () => async (dispatch) => {
    const response = await csrfFetch('/api/likes');
    const initialLikes = await response.json();
    dispatch(populateLikes(initialLikes));
    return response
}

export const createLike = (like) => async (dispatch) => {
    const { eventId, likerId } = like
    const response = await csrfFetch('/api/likes', {        
        method: "POST",
        body: JSON.stringify({
            like: {
                eventId,
                likerId
            }
        })
    })

    const data = await response.json();

    if (response.ok){
        dispatch(receiveLike(data))
    } else {
        return response
    }
    return data
}

export const deleteLike = (likeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${likeId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeLike(likeId))
    }
    return response;
}

const likeReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type){
        case POPULATE_LIKES:
            newState = { ...action.likes }
            return newState
        case RECEIVE_LIKE:
            newState = { ...newState, ...action.like}
            return newState
        case REMOVE_LIKE:
            delete newState[action.likeId]
            return newState
        default:
            return state
    }
};

export default likeReducer;