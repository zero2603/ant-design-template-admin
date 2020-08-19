import api from '../../utils/api';
import {
    GET_ALL_NOTIFICATIONS,
    GET_SPECIFIC_NOTIFICATION,
    CREATE_NEW_NOTIFICATION,
    UPDATE_SPECIFIC_NOTIFICATION,
    REMOVE_NOTIFICATIONS
} from './types';
import {NotificationManager} from 'react-notifications'

export const getAllNotifications = (filter) => (dispatch)=> {
    return new Promise((resolve, reject)=>{
        return api.get('/notifications', {params: filter}).then(res=> {
            dispatch({
                type: GET_ALL_NOTIFICATIONS,
                payload: res.data.data
            });
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const getNotification = id=> dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/notifications/${id}`).then(res => {
            dispatch({
                type: GET_SPECIFIC_NOTIFICATION,
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

export const createNotification = data=> dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/notifications', data).then(res => {
            dispatch({
                type: CREATE_NEW_NOTIFICATION,
                payload: res.data.data
            });
            NotificationManager.success("Thêm mới notification thành công!");
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const updateNotification = (id, data) => dispatch => {
    return new Promise((resolve, reject)=> {
        return api.put(`/notifications/${id}`, data).then(res => {
            dispatch({
                type: UPDATE_SPECIFIC_NOTIFICATION,
                payload: res.data.data
            });
            NotificationManager.success("Update notification thành công!")
            resolve(res.data)
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const removeNotifications = ids => dispatch => {
    return new Promise((resolve, reject)=> {
        return api.delete('/notifications', {data: {ids: ids}}).then(res => {
            dispatch({
                type: REMOVE_NOTIFICATIONS,
                payload: ids
            });
            NotificationManager.success("Xoá notification thành công!");
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}
