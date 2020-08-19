import api from '../../utils/api';
import {
    GET_ALL_ROLES,
    CREATE_NEW_ROLE,
    UPDATE_SPECIFIC_ROLE,
    REMOVE_ROLES
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllRoles = filter => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/roles', { params: filter }).then(res => {
            dispatch({
                type: GET_ALL_ROLES,
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

export const createNewRole = data => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/roles', data).then(res => {
            dispatch({
                type: CREATE_NEW_ROLE,
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

export const updateSpecificRole = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/roles/${id}`, data).then(res => {
            dispatch({
                type: UPDATE_SPECIFIC_ROLE,
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

export const removeRoles = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete('/roles', { data: { ids: ids } }).then(res => {
            dispatch({
                type: REMOVE_ROLES,
                payload: ids
            });
            NotificationManager.success("Xoá role thành công!");
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}