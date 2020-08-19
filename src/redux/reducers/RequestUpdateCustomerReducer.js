import {
    LIST_ALL_PENDING_UPDATE_CUSTOMER_REQUESTS,
    LIST_ALLOWED_UPDATE_CUSTOMER_REQUESTS,
    CREATE_UPDATE_CUSTOMER_REQUEST,
    CONFIRM_UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_BASED_ON_REQUEST
} from '../actions/types'

const INIT_STATE = {
    requests: []
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_ALL_PENDING_UPDATE_CUSTOMER_REQUESTS:
            return {
                ...state,
                requests: action.payload
            }
        case LIST_ALLOWED_UPDATE_CUSTOMER_REQUESTS:
            return {
                ...state,
                requests: action.payload
            }
        case CONFIRM_UPDATE_CUSTOMER_REQUEST: {
            let type = action.payload.type;
            let ids = action.payload.ids;

            var newRequests = state.requests.map(item => {
                if (ids.indexOf(item.id) >= 0) item.is_allow = type == 'accept' ? 1 : 2;
                return item;
            });

            return {
                ...state,
                requests: newRequests
            }
        }
        case UPDATE_CUSTOMER_BASED_ON_REQUEST: {
            var newRequests = state.requests.map(item => {
                if (item.id == action.payload) item.is_expired = 1;
                return item;
            });

            return {
                ...state,
                requests: newRequests
            }
        }
        default:
            return { ...state }
    }

}
