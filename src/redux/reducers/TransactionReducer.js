import {
    GET_ALL_TRANSACTIONS,
    GET_SPECIFIC_TRANSACTION,
    UPDATE_SPECIFIC_TRANSACTION,
    CREATE_NEW_TRANSACTION,
    REMOVE_TRANSACTIONS
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    transactions: [],
    currentTransaction: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TRANSACTIONS: {
            return {
                ...state,
                transactions: action.payload,
            }
        }
        case GET_SPECIFIC_TRANSACTION: {
            return {...state, currentTransaction: action.payload}
        }
        case CREATE_NEW_TRANSACTION: {
            let index = state.transactions.findIndex((transaction) => {
                return transaction.filter_thu_chi !== action.payload.filter_thu_chi; 
            });
            if(index >=0){
                return {...state}
            }
            else return {...state, transactions: [action.payload, ...state.transactions]}
        }
        case UPDATE_SPECIFIC_TRANSACTION: {
            let index = state.transactions.findIndex((transaction) => {
                return transaction.id == action.payload.id; 
            });

            let temp = [...state.transactions];
            temp[index] = action.payload;
            return {...state, transactions: temp}
        }
        case REMOVE_TRANSACTIONS: {
            let temp = state.transactions.filter(transaction => {
                return action.payload.indexOf(transaction.id) < 0;
            });
            return {...state, transactions: temp}
        }
        default: return { ...state };
    }
}
