import api from '../../utils/api';
import {
    LOGIN,
    LOGOUT,
    GET_AUTH_USER,
    CHANGE_PASSWORD,
    RESET_PASSWORD,
    UPDATE_AUTH_USER
} from './types';
import { setCookie, removeCookie, getCookie } from '../../utils/cookie';
import { NotificationManager } from 'react-notifications';

export const login = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/login', data).then(res => {
            console.log(res.data.data.token)
            if (data.remember) {
                setCookie('gdata_admin_token', res.data.data.token, 30);
            } else {
                setCookie('gdata_admin_token', res.data.data.token, 1);
            }

            dispatch({ type: LOGIN, payload: res.data.data });
            resolve(true)
        }).catch(err => {
            let message = "Đã có lỗi xảy ra, vui lòng thử lại!";
            if (err.response.data.msg) message = err.response.data.msg;
            NotificationManager.error(message);
            reject(err);
        })
    })
}

export const getAuthUser = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/auth').then(res => {
            dispatch({ type: GET_AUTH_USER, payload: res.data.data });
            resolve(true)
        }).catch(err => {
            console.log(err.response)
            // NotificationManager.error("Đã có lỗi xảy ra, vui lòng thử lại!");
            reject(err);
        })
    })
}

export const updateAuthUser = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put('/auth', data).then(res => {
            dispatch({ type: UPDATE_AUTH_USER, payload: res.data.data });
            NotificationManager.success("Cập nhật thành công!");
            resolve(true)
        }).catch(err => {
            console.log(err.response)
            // NotificationManager.error("Đã có lỗi xảy ra, vui lòng thử lại!");
            reject(err);
        })
    })
}

export const changePassword = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/change-password', data).then(res => {
            dispatch({ type: CHANGE_PASSWORD, payload: res.data.data });
            NotificationManager.success("Thay đổi mật khẩu thành công!");
            resolve(true)
        }).catch(err => {
            let message = "Đã có lỗi xảy ra, vui lòng thử lại!";
            if (err.response.data.msg) message = err.response.data.msg;
            NotificationManager.error(message);
            reject(err);
        })
    })
}

export const resetPassword = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/reset-password', data).then(res => {
            dispatch({ type: RESET_PASSWORD, payload: res.data.data });
            resolve(true)
        }).catch(err => {
            console.log(err);
            let message = "Đã có lỗi xảy ra, vui lòng thử lại!";
            if (err.response.data.msg) message = err.response.data.msg;
            NotificationManager.error(message);
            reject(err);
        })
    })
}

export const logout = () => dispatch => {
    return new Promise((resolve, reject) => {
        removeCookie('gdata_admin_token');
        dispatch({ type: LOGOUT });
        resolve(true);
    })
}