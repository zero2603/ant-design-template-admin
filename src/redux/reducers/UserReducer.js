import {
    GET_ALL_USERS,
    GET_SPECIFIC_USER,
    UPDATE_SPECIFIC_USER,
    CREATE_NEW_USER,
    REMOVE_USERS
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    users: [],
    currentUser: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_USERS: {
            return {
                ...state,
                users: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_USER: {
            return {...state, currentUser: action.payload}
        }
        case CREATE_NEW_USER: {
            return {...state, users: [action.payload, ...state.users], total: state.total + 1}
        }
        case UPDATE_SPECIFIC_USER: {
            let index = state.users.findIndex((user) => {
                return user.id == action.payload.id; 
            });

            let temp = [...state.users];
            temp[index] = action.payload;
            return {...state, users: temp}
        }
        case REMOVE_USERS: {
            let temp = state.users.filter(user => {
                return action.payload.indexOf(user.id) < 0; // get only user not in removed ids
            });
            return {...state, users: temp}
        }
        default: return { ...state };
    }
}
