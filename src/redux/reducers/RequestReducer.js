import {
    GET_ALL_REQUESTS,
    GET_SPECIFIC_REQUEST,
    UPDATE_SPECIFIC_REQUEST,
    RESPONSE_REQUEST,
    CREATE_REQUEST
}from '../actions/types'

const INIT_STATE = {
    requests: [],
    currentRequest: {},
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
}

export default (state= INIT_STATE, action)=> {
    switch (action.type) {
        case GET_ALL_REQUESTS:
            return {
                ...state,
                requests: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page)
                }
            }
        case GET_SPECIFIC_REQUEST:
            return {
                ...state,
                currentRequest: action.payload
            }
        case UPDATE_SPECIFIC_REQUEST: {
            let currentRequest = state.currentRequest;
            currentRequest = {
                ...currentRequest,
                ...action.payload
            }

            return {...state, currentRequest: currentRequest}
        }
        case RESPONSE_REQUEST: {
            let currentResponses = [...state.currentRequest.responses];
            let responses = [...currentResponses, action.payload.response];

            return {
                ...state,
                currentRequest: {
                    ...state.currentRequest,
                    is_reply: 1,
                    responses: responses
                }
            }
        }
        case CREATE_REQUEST:{
            return {
                ...state,
            }
        }    
        default:
            return{...state}
    }

}
