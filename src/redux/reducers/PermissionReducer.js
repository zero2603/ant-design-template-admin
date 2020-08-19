import {
    GET_ALL_PERMISSIONS,
    UPDATE_ROLE_PERMISSIONS,
    GET_PERMISSIONS_BY_ROLE
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    permissions: [],
    permissionsByRole: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PERMISSIONS: {
            return {
                ...state,
                permissions: action.payload.data,
            }
        }
        case UPDATE_ROLE_PERMISSIONS: {
            return { ...state };
        }
        case GET_PERMISSIONS_BY_ROLE: {
            return { ...state, permissionsByRole: action.payload.data, };
        }
        default: return { ...state };
    }
}
