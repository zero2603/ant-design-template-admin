import api from '../../utils/api';
import {
    GET_ALL_USERS,
    GET_SPECIFIC_USER,
    UPDATE_SPECIFIC_USER,
    CREATE_NEW_USER,
    REMOVE_USERS
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllUsers = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/users', {params: filter}).then(res => {
            dispatch({type: GET_ALL_USERS, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createUser = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/users', data).then(res => {
            dispatch({type: CREATE_NEW_USER, payload: res.data.data});
            NotificationManager.success("Thêm mới user thành công!");
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const getUser = (id, filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/users/${id}`, {params: filter}).then(res => {
            dispatch({type: GET_SPECIFIC_USER, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const updateUser = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/users/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_USER, payload: res.data.data});
            NotificationManager.success("Cập nhật user thành công!");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeUsers = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/users`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_USERS, payload: ids});
            NotificationManager.success("Xoá user thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}