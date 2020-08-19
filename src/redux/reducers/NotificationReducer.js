import {
    GET_ALL_NOTIFICATIONS,
    GET_SPECIFIC_NOTIFICATION,
    CREATE_NEW_NOTIFICATION,
    UPDATE_SPECIFIC_NOTIFICATION,
    REMOVE_NOTIFICATIONS
} from '../actions/types';

const INIT_STATE = {
    notifications: [],
    currentNotification: null,
    pagination: {
        currentPage: 1,
        total: 0,
        perPage: 10
    }
}

export default (state= INIT_STATE, action)=>{
    switch(action.type){
        case GET_ALL_NOTIFICATIONS: 
            return {
                ...state,
                notifications: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page)
                }
            };
        case GET_SPECIFIC_NOTIFICATION: 
            return {
                ...state,
                currentNotification: action.payload
            };
        case CREATE_NEW_NOTIFICATION:

            return{
                ...state,
                notifications: [action.payload, ...state.notifications],
                total: state.total + 1
            } 
        case UPDATE_SPECIFIC_NOTIFICATION:
            let index = state.notifications.findIndex(notification => {
                return notification.id == action.payload.id
            });
            let temp = [...state.notifications];
            temp[index] = action.payload
            return {
                ...state,
                notifications: temp
            } 
        case REMOVE_NOTIFICATIONS:
            let temp1 = state.notifications.filter(notification => {
                return action.payload.indexOf(notification.id) <0;
            })
            return {
                ...state,
                notifications: temp1

            }            
        default:
            return {...state}
    }
};
