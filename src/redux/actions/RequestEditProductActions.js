import api from '../../utils/api';
import {
    LIST_ALL_PENDING_UPDATE_PRODUCT_REQUESTS,
    LIST_ALLOWED_UPDATE_PRODUCT_REQUESTS,
    CREATE_UPDATE_PRODUCT_REQUEST,
    CONFIRM_UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_BASED_ON_REQUEST,
    UPDATE_MANY_PRODUCTS_BASED_ON_REQUEST
} from './types';
import {NotificationManager} from 'react-notifications';

export const getAllPendingRequests = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/update-product-requests', data).then(res => {
            dispatch({
                type: LIST_ALL_PENDING_UPDATE_PRODUCT_REQUESTS,
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
        return api.get('/update-product-requests/allowed', data).then(res => {
            dispatch({
                type: LIST_ALLOWED_UPDATE_PRODUCT_REQUESTS,
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
        return api.post('/update-product-requests', data).then(res => {
            dispatch({
                type: CREATE_UPDATE_PRODUCT_REQUEST,
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
        return api.post('/update-product-requests/confirm', data).then(res => {
            dispatch({
                type: CONFIRM_UPDATE_PRODUCT_REQUEST,
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

export const updateProductBasedOnRequest = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put('/update-product-requests/update', data).then(res => {
            dispatch({
                type: UPDATE_PRODUCT_BASED_ON_REQUEST,
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

export const updateManyProductsBasedOnRequest = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put('/update-product-requests/update-many', data).then(res => {
            var ids = data.items.map(item => item.request_id);
            dispatch({
                type: UPDATE_MANY_PRODUCTS_BASED_ON_REQUEST,
                payload: ids
            });
            
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}