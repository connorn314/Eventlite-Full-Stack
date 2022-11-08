import csrfFetch from "./csrf";

const POPULATE_USERS = 'user/populate';
const RECEIVE_USER = 'user/receiveUser';

export const populateUsers = (initialUsers) => {
    return {
        type: POPULATE_USERS,
        users: initialUsers
    }
}

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER, 
        user
    }
}

export const getUsersData = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');
    const initialUsers = await response.json();
    dispatch(populateUsers(initialUsers));
    return response
}

export const getOneUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch(receiveUser(data));
    return response;
}

const userReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type){
        case POPULATE_USERS:
            newState = { ...action.users }
            return newState
        case RECEIVE_USER:
            newState = { ...newState, ...action.user }
            return newState
        default:
            return state
    }
};

export default userReducer;