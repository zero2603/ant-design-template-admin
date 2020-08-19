import {
    GET_ALL_PENDING_CUSTOMERS,
    CREATE_SUPPORT_CALL_NOTE,
    GET_OLD_NOTES_OF_SPECIFIC_CUSTOMER
} from "../actions/types";

/**
 * initial state
 */
const INIT_STATE = {
    customers: [],
    notes: [],
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10,
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PENDING_CUSTOMERS: {
            return {
                ...state,
                customers: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                },
            };
        }
        case CREATE_SUPPORT_CALL_NOTE: {
            return { ...state, currentShop: action.payload };
        }
        case GET_OLD_NOTES_OF_SPECIFIC_CUSTOMER: {
            return {
                ...state,
                notes: action.payload
            };
        }
        default:
            return { ...state };
    }
};
