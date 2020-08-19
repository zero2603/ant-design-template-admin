import {
    GET_ALL_SERVICES,
    GET_SPECIFIC_SERVICE,
    UPDATE_SPECIFIC_SERVICE,
    CREATE_NEW_SERVICE,
    REMOVE_SERVICES
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    services: [],
    currentService: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_SERVICES: {
            return {
                ...state,
                services: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_SERVICE: {
            return {...state, currentService: action.payload}
        }
        case CREATE_NEW_SERVICE: {
            return {...state, services: [action.payload, ...state.services], total: state.total + 1}
        }
        case UPDATE_SPECIFIC_SERVICE: {
            let index = state.services.findIndex((service) => {
                return service.id == action.payload.id; 
            });

            let temp = [...state.services];
            temp[index] = action.payload;
            return {...state, currentService: action.payload, services: temp}
        }
        case REMOVE_SERVICES: {
            let temp = state.services.filter(service => {
                return action.payload.indexOf(service.id) < 0; 
            })
            return {...state, services: temp}
        }
        default: return { ...state };
    }
}
