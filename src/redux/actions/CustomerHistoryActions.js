import api from '../../utils/api';
import {
    GET_ALL_CUSTOMER_HISTORY,
    CREATE_CUSTOMER_HISTORY,
    REMOVE_CUSTOMER_HISTORY,
    DOWNLOAD_CUSTOMER_HISTORY
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllCustomerHistory = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/customer-history', {params: filter}).then(res => {
            dispatch({type: GET_ALL_CUSTOMER_HISTORY, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createCustomerHistory = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/customer-history', data).then(res => {
            dispatch({type: CREATE_CUSTOMER_HISTORY, payload: res.data.data});
            NotificationManager.success("Thêm mới lịch sử thành công!");
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeCustomerHistory = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/customer-history`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_CUSTOMER_HISTORY, payload: ids});
            NotificationManager.success("Xoá lịch sử thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const downloadCustomerHistory = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/customer-history/export', filter).then(res => {
            dispatch({type: DOWNLOAD_CUSTOMER_HISTORY, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}