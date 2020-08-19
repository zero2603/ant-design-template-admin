import api from '../../utils/api';
import {
    GET_ALL_POTENTIAL_CUSTOMERS,
    GET_SPECIFIC_POTENTIAL_CUSTOMER,
    CREATE_NEW_POTENTIAL_CUSTOMER,
    UPDATE_SPECIFIC_POTENTIAL_CUSTOMER,
    REMOVE_POTENTIAL_CUSTOMERS,
    UPLOAD_FILE,
    CREATE_CUSTOMER_FROM_POTENTIAL_CUSTOMER
} from './types';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export const getAllPotentialCustomers = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/potential-customers', { params: filter }).then((res) => {
            dispatch({
                type: GET_ALL_POTENTIAL_CUSTOMERS,
                payload: res.data.data
            });

            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

export const getPotentialCustomer = id => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/potential-customers/${id}`).then(res => {
            dispatch({
                type: GET_SPECIFIC_POTENTIAL_CUSTOMER,
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

export const createPotentialCustomer = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/potential-customers', data).then(res => {
            dispatch({ type: CREATE_NEW_POTENTIAL_CUSTOMER, payload: res.data.data });
            NotificationManager.success("Thêm mới khách hàng tiềm năng thành công!");
            resolve(res.data.data);
        }).catch(err => {
            // NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const updatePotentialCustomer = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/potential-customers/${id}`, data).then(res => {
            dispatch({ type: UPDATE_SPECIFIC_POTENTIAL_CUSTOMER, payload: res.data.data });
            NotificationManager.success("Cập nhật khách hàng tiềm năng thành công!");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const removePotentialCustomers = ids => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete('/potential-customers', { data: { ids: ids } }).then((res) => {
            dispatch({
                type: REMOVE_POTENTIAL_CUSTOMERS,
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

export const upLoadFile = (data, header) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/potential-customers/import', data, header).then((res) => {
            dispatch({
                type: UPLOAD_FILE,
                payload: res,
            });
            NotificationManager.success("Import file thành công");
            resolve(res);
        }).catch(err => {
            console.log("errr", err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const createCustomerFromPotentialCustomer = (id) => dispatch => {
    console.log(id)
    dispatch({type: CREATE_CUSTOMER_FROM_POTENTIAL_CUSTOMER, payload: id});
}