import api from '../../utils/api';
import {
    GET_ALL_TRANSACTIONS,
    GET_SPECIFIC_TRANSACTION,
    UPDATE_SPECIFIC_TRANSACTION,
    CREATE_NEW_TRANSACTION,
    REMOVE_TRANSACTIONS,
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllTransactions = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/transactions', {params: filter}).then(res => {
            dispatch({type: GET_ALL_TRANSACTIONS, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createTransaction = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/transactions', data).then(res => {
            dispatch({type: CREATE_NEW_TRANSACTION, payload: res.data.data});
            NotificationManager.success("Create thành công!");
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const getTransaction = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/transactions/${id}`).then(res => {
            dispatch({type: GET_SPECIFIC_TRANSACTION, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const updateTransaction = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/transactions/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_TRANSACTION, payload: res.data.data});
            NotificationManager.success("Update thành công!");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeTransactions = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/transactions`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_TRANSACTIONS, payload: ids});
            NotificationManager.success("Xóa thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}
