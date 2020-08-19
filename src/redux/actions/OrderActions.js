import api from '../../utils/api';
import {
    GET_ALL_ORDERS,
    GET_SPECIFIC_ORDER,
    UPDATE_SPECIFIC_ORDER
} from './types';
import {NotificationManager} from 'react-notifications'

export const getAllOrders = (filter) => (dispatch)=> {
    return new Promise((resolve, reject)=>{
        return api.get('/orders', {params: filter}).then(res=> {
            dispatch({
                type: GET_ALL_ORDERS,
                payload: res.data.data
            });
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const getOrderDetail = (id) => (dispatch)=> {
    return new Promise((resolve, reject)=>{
        return api.get(`/orders/${id}`).then(res=> {
            dispatch({
                type: GET_SPECIFIC_ORDER,
                payload: res.data.data
            });
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const updateOrderDetail = (id, data) => (dispatch)=> {
    return new Promise((resolve, reject)=>{
        return api.put(`/orders/${id}`, data).then(res=> {
            dispatch({
                type: UPDATE_SPECIFIC_ORDER,
                payload: res.data.data
            });
            NotificationManager.success("Cập nhật đơn hàng thành công");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}
