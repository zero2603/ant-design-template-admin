import {
    GET_ALL_WEB_CUSTOMERS,
    GET_SPECIFIC_WEB_CUSTOMER,
    UPDATE_SPECIFIC_WEB_CUSTOMER,
    REMOVE_WEB_CUSTOMERS,
} from '../actions/types';
import qs from 'qs';

const INIT_STATE = {
    customers: [],
    currentCustomer: null,
    pagination: {
        currentPage: 1,
        total: 0,
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_WEB_CUSTOMERS: {
            return {
                ...state,
                customers: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_WEB_CUSTOMER: {
            return {
                ...state,
                currentCustomer: action.payload
            }
        }
        case UPDATE_SPECIFIC_WEB_CUSTOMER: {
            let index = state.customers.findIndex(customer => {
                return customer.id == action.payload.id;
            })
            let temp1 = [...state.customers];
            temp1[index] = {...action.payload};
            return {
                ...state, customers: temp1, currentCustomer: {...state.currentCustomer, ...action.payload}
            }
        }

        case REMOVE_WEB_CUSTOMERS: {
            let temp = state.customers.filter(customer => {
                return action.payload.indexOf(customer.id) < 0; // get only user not in removed ids
            });
            return {
                ...state,
                customers: temp
            }
        }
            
        default:
            return { ...state };
    }
}
