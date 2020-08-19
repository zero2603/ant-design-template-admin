import {
    GET_ALL_CUSTOMER_HISTORY
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    customerHistories: [],
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUSTOMER_HISTORY: {
            return {
                ...state,
                customerHistories: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        default: return { ...state };
    }
}
