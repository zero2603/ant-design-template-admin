import {
    GET_ALL_PARTNERS,
    GET_SPECIFIC_PARTNER,
    UPDATE_SPECIFIC_PARTNER,
    CREATE_NEW_PARTNER,
    REMOVE_PARTNERS
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    partners: [],
    currentPartner: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PARTNERS: {
            return {
                ...state,
                partners: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_PARTNER: {
            return {...state, currentPartner: action.payload}
        }
        case CREATE_NEW_PARTNER: {
            return {...state, partners: [action.payload, ...state.partners], total: state.total + 1}
        }
        case UPDATE_SPECIFIC_PARTNER: {
            let index = state.partners.findIndex(partner => {
                return partner.id == action.payload.id; 
            });

            let temp = [...state.partners];
            temp[index] = action.payload;
            return {...state, partners: temp}
        }
        case REMOVE_PARTNERS: {
            let temp = state.partners.filter(partner => {
                return action.payload.indexOf(partner.id) < 0; 
            });
            return {...state, partners: temp}
        }
        default: return { ...state };
    }
}
