import {
    GET_ALL_ORDERS,
    GET_SPECIFIC_ORDER,
    UPDATE_SPECIFIC_ORDER
} from '../actions/types';

const INIT_STATE = {
    orders: [],
    currentOrder: null,
    pagination: {
        currentPage: 1,
        total: 0,
        perPage: 10
    }
}

export default (state= INIT_STATE, action)=>{
    switch(action.type){
        case GET_ALL_ORDERS: {
            return {
                ...state,
                orders: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page)
                }
            };  
        }
        case GET_SPECIFIC_ORDER: {
            return {
                ...state,
                currentOrder: action.payload,
            }
        }    
        case UPDATE_SPECIFIC_ORDER: {
            return {
                ...state,
                currentOrder: action.payload
            }
        }
        default:
            return {...state}
    }
};
