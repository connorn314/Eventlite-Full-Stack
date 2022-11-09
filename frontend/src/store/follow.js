import csrfFetch from "./csrf";

const POPULATE_FOLLOWS = 'follow/populate';
const RECEIVE_FOLLOW = 'follow/receive';
const REMOVE_FOLLOW = 'follow/remove';

export const populateFollows = (initialFollows) => {
    return {
        type: POPULATE_FOLLOWS,
        follows: initialFollows
    }
}

export const getUserFollows = () => async (dispatch) => {
    const response = await csrfFetch('api/follows');
    const initialFollows = await response.json();
    dispatch(populateFollows(initialFollows));
    return response;
}

const followReducer = (state = {}, action ) => {
    let newState = { ...state }
    switch (action.type){
        case POPULATE_FOLLOWS:
            newState = { ...action.follows }
            return newState
        default:
            return state
    }
};

export default followReducer;