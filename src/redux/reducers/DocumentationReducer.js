import {
    GET_ALL_DOCUMENTATION,
    GET_SPECIFIC_DOCUMENTATION,
    UPDATE_SPECIFIC_DOCUMENTATION,
    CREATE_NEW_DOCUMENTATION,
    REMOVE_DOCUMENTATIONS,
    GET_ALL_DOCUMENTATIONS
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    documentations: [],
    currentDocumentation: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_DOCUMENTATIONS: {
            return {
                ...state,
                documentations: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_DOCUMENTATION: {
            return {...state, currentDocumentation: action.payload}
        }
        case CREATE_NEW_DOCUMENTATION: {
            return {...state, documentations: [action.payload, ...state.documentations], total: state.total + 1}
        }
        case UPDATE_SPECIFIC_DOCUMENTATION: {
            let index = state.documentations.findIndex((doc) => {
                return doc.id == action.payload.id; 
            });

            let temp = [...state.documentations];
            temp[index] = action.payload;
            return {...state, documentations: temp}
        }
        case REMOVE_DOCUMENTATIONS: {
            let temp = state.documentations.filter(doc => {
                return action.payload.indexOf(doc.id) < 0; 
            });
            return {...state, documentations: temp}
        }
        default: return { ...state };
    }
}
