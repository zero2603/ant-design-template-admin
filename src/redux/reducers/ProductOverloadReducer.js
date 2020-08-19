import {
    LIST_ALL_PRODUCT_OVERLOAD_ALERTS
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    alerts: [],
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_ALL_PRODUCT_OVERLOAD_ALERTS: {
            return {
                ...state,
                alerts: action.payload.data,
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
