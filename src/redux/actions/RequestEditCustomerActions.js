import api from '../../utils/api';
import {
    LIST_ALL_PENDING_UPDATE_CUSTOMER_REQUESTS,
    LIST_ALLOWED_UPDATE_CUSTOMER_REQUESTS,
    CREATE_UPDATE_CUSTOMER_REQUEST,
    CONFIRM_UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_BASED_ON_REQUEST,
} from './types';
import {NotificationManager} from 'react-notifications';

export const getAllPendingRequests = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/update-customer-requests', data).then(res => {
            dispatch({
                type: LIST_ALL_PENDING_UPDATE_CUSTOMER_REQUESTS,
                payload: res.data.data
            });
            
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}

export const getAllAllowedRequests = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/update-customer-requests/allowed', data).then(res => {
            dispatch({
                type: LIST_ALLOWED_UPDATE_CUSTOMER_REQUESTS,
                payload: res.data.data
            });
            
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}

export const createRequest = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/update-customer-requests', data).then(res => {
            dispatch({
                type: CREATE_UPDATE_CUSTOMER_REQUEST,
                payload: res.data.data
            });
            
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}

export const confirmRequests = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/update-customer-requests/confirm', data).then(res => {
            dispatch({
                type: CONFIRM_UPDATE_CUSTOMER_REQUEST,
                payload: data
            });
            
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}

export const updateCustomerBasedOnRequest = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put('/update-customer-requests/update', data).then(res => {
            dispatch({
                type: UPDATE_CUSTOMER_BASED_ON_REQUEST,
                payload: data.request_id
            });
            
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}