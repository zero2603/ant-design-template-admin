import {
    GET_ALL_CUSTOMERS,
    GET_ALL_CUSTOMERS_WITH_CONCATENATE,
    GET_SPECIFIC_CUSTOMER,
    CREATE_NEW_CUSTOMER,
    UPDATE_SPECIFIC_CUSTOMER,
    REMOVE_CUSTOMERS,
    UPDATE_STATUS_CUSTOMERS,
    CREATE_CUSTOMER_HISTORY,
    REMOVE_CUSTOMER_HISTORY
} from '../actions/types';

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
        case GET_ALL_CUSTOMERS: {
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

        case GET_ALL_CUSTOMERS_WITH_CONCATENATE: {
            let listCustomers = [...state.customers, ...action.payload.data];

            return {
                ...state,
                customers: listCustomers,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_CUSTOMER: {
            return {
                ...state,
                currentCustomer: action.payload
            }
        }
        case CREATE_NEW_CUSTOMER:{
            return {
                ...state,
                customers: [action.payload, ...state.customers],
                total: state.total + 1
            }
        }
        case UPDATE_SPECIFIC_CUSTOMER: {
            let index = state.customers.findIndex(customer => {
                return customer.id == action.payload.id;
            })
            let temp1 = [...state.customers];
            temp1[index] = action.payload;
            return {
                ...state, customers: temp1, currentCustomer: {...state.currentCustomer, ...action.payload}
            }
        }

        case REMOVE_CUSTOMERS: {
            let temp = state.customers.filter(customer => {
                return action.payload.indexOf(customer.id) < 0; // get only user not in removed ids
            });
            return {
                ...state,
                customers: temp
            }
        }

        case UPDATE_STATUS_CUSTOMERS: {
            return { ...state};
        }

        case CREATE_CUSTOMER_HISTORY: {
            let histories = state.currentCustomer.customerHistories;

            if(!histories) histories = [action.payload];
            else histories = [action.payload, ...histories];

            return {...state, currentCustomer: {...state.currentCustomer, customerHistories: histories}}
        }

        case REMOVE_CUSTOMER_HISTORY: {
            let histories = state.currentCustomer.customerHistories.filter(history => {
                return action.payload.indexOf(history.id) < 0;
            });

            return {...state, currentCustomer: {...state.currentCustomer, customerHistories: histories}}
        }
            
        default:
            return { ...state };
    }
}
