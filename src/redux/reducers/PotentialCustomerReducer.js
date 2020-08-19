import {
    GET_ALL_POTENTIAL_CUSTOMERS,
    GET_SPECIFIC_POTENTIAL_CUSTOMER,
    CREATE_NEW_POTENTIAL_CUSTOMER,
    UPDATE_SPECIFIC_POTENTIAL_CUSTOMER,
    REMOVE_POTENTIAL_CUSTOMERS,
    UPLOAD_FILE,
    CREATE_CUSTOMER_FROM_POTENTIAL_CUSTOMER
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
        case GET_ALL_POTENTIAL_CUSTOMERS: {
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
        case GET_SPECIFIC_POTENTIAL_CUSTOMER: {
            return {
                ...state,
                currentCustomer: action.payload
            }
        }
        case CREATE_NEW_POTENTIAL_CUSTOMER: {
            let query = qs.parse(window.location.search.slice(1));
            let customers = [...state.customers];

            customers = [action.payload, ...state.customers]
                    
            return {
                ...state,
                customers: customers,
                total: state.total + 1
            }
        }
        case UPDATE_SPECIFIC_POTENTIAL_CUSTOMER: {
            let index = state.customers.findIndex(customer => {
                return customer.id == action.payload.id;
            })
            let temp1 = [...state.customers];
            temp1[index] = {...action.payload};
            return {
                ...state, customers: temp1, currentCustomer: {...state.currentCustomer, ...action.payload}
            }
        }

        case REMOVE_POTENTIAL_CUSTOMERS: {
            let temp = state.customers.filter(customer => {
                return action.payload.indexOf(customer.id) < 0; // get only user not in removed ids
            });
            return {
                ...state,
                customers: temp
            }
        }

        case UPLOAD_FILE: {
            return {
                ...state
            }
        }

        case CREATE_CUSTOMER_FROM_POTENTIAL_CUSTOMER: {
            let currentId = parseInt(action.payload);
            let temp = state.customers.filter(customer => {
                return parseInt(customer.id) != currentId;
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
