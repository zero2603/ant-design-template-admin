import {
    GET_CONFIG,
    SET_CONFIG
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    roles: [],
    nvkd: [],
    nvkt: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_CONFIG: {
            return {
                ...action.payload
            }
        }
        case SET_CONFIG: {
            return {
                ...state
            }
        }
        default: return { ...state };
    }
}
