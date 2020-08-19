import {
    GET_ALL_ROLES,
    CREATE_NEW_ROLE,
    UPDATE_SPECIFIC_ROLE,
    REMOVE_ROLES
} from '../actions/types'

const INIT_STATE = {
    roles: [],
    currentRole: {},
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_ROLES: {
            return {
                ...state,
                roles: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page)
                }
            }
        }
        case CREATE_NEW_ROLE: {
            return {
                ...state,
                roles: [
                    action.payload,
                    ...state.roles
                ]
            }
        }
        case REMOVE_ROLES: {
            let temp = state.roles.filter(role => {
                return action.payload.indexOf(role.id) < 0; 
            });
            return {...state, roles: temp} 
        }
        default:
            return { ...state }
    }

}
