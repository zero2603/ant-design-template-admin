import {
    GET_ALL_CATEGORIES,
    GET_SPECIFIC_CATEGORY,
    UPDATE_SPECIFIC_CATEGORY,
    CREATE_NEW_CATEGORY,
    REMOVE_CATEGORIES
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    categories: [],
    currentCategory: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES: {
            return {
                ...state,
                categories: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_CATEGORY: {
            return {...state, currentCategory: action.payload}
        }
        case CREATE_NEW_CATEGORY: {
            return {...state, categories: [action.payload, ...state.categories], total: state.total + 1}
        }
        case UPDATE_SPECIFIC_CATEGORY: {
            let index = state.categories.findIndex((category) => {
                return category.id == action.payload.id; 
            });

            let temp = [...state.categories];
            temp[index] = action.payload;
            return {...state, categories: temp}
        }
        case REMOVE_CATEGORIES: {
            let temp = state.categories.filter(category => {
                return action.payload.indexOf(category.id) < 0; 
            });
            return {...state, categories: temp}
        }
        default: return { ...state };
    }
}
