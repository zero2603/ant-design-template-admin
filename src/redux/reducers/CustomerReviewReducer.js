import {
    CUSTOMER_REVIEWS
} from '../actions/types';

const INIT_STATE = {
    customerReviews: [],
    pagination: {
        currentPage: 1,
        total: 0,
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case CUSTOMER_REVIEWS: {
            return {
                ...state,
                customerReviews: action.payload.data,
                pagination: {
                    currentPage: action.payload.current_page,
                    total: action.payload.total,
                    perPage: action.payload.per_page
                }
            }
        }

        default:
            return {...state};
    }
}
