import { NotificationManager } from 'react-notifications';
import {
    GET_ALL_PERMISSIONS,
    UPDATE_ROLE_PERMISSIONS,
    GET_PERMISSIONS_BY_ROLE,
    GET_PERMISSIONS_BY_USER
} from './types';
import api from '../../utils/api';

export const getAllPermissions = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/permissions').then(res => {
            dispatch({ type: GET_ALL_PERMISSIONS, payload: res.data });
            resolve(true)
        }).catch(err => {
            console.error(err.response);
            NotificationManager.error("Đã có lỗi xảy ra, vui lòng thử lại!");
            reject(err);
        })
    })
}

export const getPermissionsByRole = (role) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/permissions/role?role=${role}`).then(res => {
            dispatch({ type: GET_PERMISSIONS_BY_ROLE, payload: res.data });
            resolve(res.data.data)
        }).catch(err => {
            console.error(err.response);
            NotificationManager.error("Đã có lỗi xảy ra, vui lòng thử lại!");
            reject(err);
        })
    })
}

export const getPermissionsByUser = (user) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/permissions/user?user=${user}`).then(res => {
            dispatch({ type: GET_PERMISSIONS_BY_USER, payload: res.data });
            resolve(res.data.data)
        }).catch(err => {
            console.error(err.response);
            NotificationManager.error("Đã có lỗi xảy ra, vui lòng thử lại!");
            reject(err);
        })
    })
}

export const updateRolePermissions = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put('/permissions', data).then(res => {
            dispatch({ type: UPDATE_ROLE_PERMISSIONS });
            NotificationManager.success("Cập nhật thành công!");
            resolve(true)
        }).catch(err => {
            console.error(err.response);
            NotificationManager.error("Đã có lỗi xảy ra, vui lòng thử lại!");
            reject(err);
        })
    })
}