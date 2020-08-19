import {
    GET_ALL_DATACENTER_REQUESTS,
    GET_SPECIFIC_DATACENTER_REQUEST,
    UPDATE_SPECIFIC_DATACENTER_REQUEST,
    CREATE_NEW_DATACENTER_REQUEST,
    REMOVE_DATACENTER_REQUESTS,
    DOWNLOAD_DATACENTER_REQUESTS
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    datacenters: [],
    currentDatacenter: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_DATACENTER_REQUESTS: {
            return {
                ...state,
                datacenters: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_DATACENTER_REQUEST: {
            return {...state, currentDatacenter: action.payload}
        }
        case CREATE_NEW_DATACENTER_REQUEST: {
            return {...state, datacenters: [action.payload, ...state.datacenters], total: state.total + 1}
        }
        case UPDATE_SPECIFIC_DATACENTER_REQUEST: {
            let index = state.datacenters.findIndex((datacenter) => {
                return datacenter.id == action.payload.id; 
            });

            let temp = [...state.datacenters];
            temp[index] = action.payload;
            return {...state, datacenters: temp}
        }
        case REMOVE_DATACENTER_REQUESTS: {
            let temp = state.datacenters.filter(datacenter=> {
                return action.payload.indexOf(datacenter.id) < 0; // get only user not in removed ids
            });
            return {...state, datacenters: temp}
        }
        case DOWNLOAD_DATACENTER_REQUESTS: {
            return {...state}
        }
        default: return { ...state };
    }
}
