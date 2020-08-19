import api from '../../utils/api';
import {
    GET_ALL_WEB_CUSTOMERS,
    GET_SPECIFIC_WEB_CUSTOMER,
    UPDATE_SPECIFIC_WEB_CUSTOMER,
    REMOVE_WEB_CUSTOMERS,
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllWebCustomers = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/web-customers', { params: filter }).then((res) => {
            dispatch({
                type: GET_ALL_WEB_CUSTOMERS,
                payload: res.data.data
            });

            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

export const getWebCustomer = id => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/web-customers/${id}`).then(res => {
            dispatch({
                type: GET_SPECIFIC_WEB_CUSTOMER,
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


export const updateWebCustomer = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/web-customers/${id}`, data).then(res => {
            dispatch({ type: UPDATE_SPECIFIC_WEB_CUSTOMER, payload: res.data.data });
            NotificationManager.success("Cập nhật khách hàng thành công!");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const removeWebCustomers = ids => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete('/web-customers', { data: { ids: ids } }).then((res) => {
            dispatch({
                type: REMOVE_WEB_CUSTOMERS,
                payload: ids,
            });
            NotificationManager.success("Xoá khách hàng thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log("errr", err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}