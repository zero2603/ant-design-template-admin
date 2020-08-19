import api from '../../utils/api';
import {
    GET_ALL_CUSTOMERS,
    GET_ALL_CUSTOMERS_WITH_CONCATENATE,
    GET_SPECIFIC_CUSTOMER,
    CREATE_NEW_CUSTOMER,
    UPDATE_SPECIFIC_CUSTOMER,
    REMOVE_CUSTOMERS,
    UPDATE_STATUS_CUSTOMERS,
    CUSTOMER_REVIEWS,
    DOWNLOAD_CUSTOMERS
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllCustomers = (filter, concatenate = false) => dispatch => {
    return new Promise((resolve, reject) =>{
        return api.get('/customers', {params: filter}).then((res)=>{
            if(!concatenate) {
                dispatch({
                    type: GET_ALL_CUSTOMERS,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: GET_ALL_CUSTOMERS_WITH_CONCATENATE,
                    payload: res.data.data
                });
            }
            
            resolve(res.data);
        }).catch(err =>{
            console.log(err);
            reject(err);
        });
    });
}

export const getCustomer = id => dispatch => {
    return new Promise((resolve, reject)=>{
        return api.get(`/customers/${id}`).then(res=>{
            dispatch({
                type: GET_SPECIFIC_CUSTOMER,
                payload: res.data.data
            });
            resolve(res.data.data);
        }).catch(err =>{
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const createCustomer = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/customers', data).then(res => {
            dispatch({type: CREATE_NEW_CUSTOMER, payload: res.data.data});
            NotificationManager.success("Thêm mới khách hàng thành công!");
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const updateCustomer = (id, data) => dispatch=> {
    return new Promise((resolve, reject)=>{
        return api.put(`/customers/${id}`, data).then(res=>{
            dispatch({type: UPDATE_SPECIFIC_CUSTOMER, payload: res.data.data});
            NotificationManager.success("Cập nhật khách hàng thành công!");
            resolve(res.data);
        }).catch(err =>{
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const removeCustomers = ids => dispatch => {
    return new Promise((resolve, reject)=>{
        return api.delete('/customers', {data: {ids: ids}}).then((res)=>{
            dispatch({
                type: REMOVE_CUSTOMERS,
                payload: ids,
            });
            NotificationManager.success("Xoá khách hàng thành công!");
            resolve(res.data);
        }).catch(err =>{
            console.log("errr", err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const updateStatus = data => dispatch =>{
    return new Promise((reslove, reject) => {
        return api.put('/customers/status', data).then((res) => {
            dispatch({
                type: UPDATE_STATUS_CUSTOMERS,
                payload: res.data
            });
            NotificationManager.success("Cập nhật trạng thái thành công!!");
            reslove(res.data);
        }).catch( err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const getCustomerReviews = filter => dispatch => {
    return new Promise((reslove, reject) => {
        return api.get('/customer-reviews', {params: filter}).then(res => {
            dispatch({type: CUSTOMER_REVIEWS, payload: res.data.data});
            reslove(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const downloadCustomerData = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/customers/export`, filter).then(res => {
            dispatch({ type: DOWNLOAD_CUSTOMERS , payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            console.log(err.response);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}