import {
    LOGIN,
    GET_AUTH_USER,
    LOGOUT
} from '../actions/types';

const INIT_STATE = {
    authUser: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN: {
            return { ...state, authUser: action.payload.user };
        }
        case GET_AUTH_USER: {
            return { ...state, authUser: action.payload };
        }
        case LOGOUT: {
            return { ...state, authUser: null };
        }
        default: {
            return { ...state };
        }
    }
}