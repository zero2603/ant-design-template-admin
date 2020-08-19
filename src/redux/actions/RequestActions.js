import api from '../../utils/api';
import {
    GET_ALL_REQUESTS,
    GET_SPECIFIC_REQUEST,
    UPDATE_SPECIFIC_REQUEST,
    RESPONSE_REQUEST,
    CREATE_REQUEST,
    DOWNLOAD_REQUEST
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllRequests = filter => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/requests', { params: filter }).then(res => {
            dispatch({
                type: GET_ALL_REQUESTS,
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

export const getRequest = id => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/requests/${id}`).then(res => {
            dispatch({
                type: GET_SPECIFIC_REQUEST,
                payload: res.data.data
            });
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err)
        });
    });
}

export const updateRequest = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/requests/${id}`, data).then(res => {
            console.log(res.data.data)
            dispatch({
                type: UPDATE_SPECIFIC_REQUEST,
                payload: res.data.data
            });
            NotificationManager.success("Update thành công !")
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}

export const responseRequest = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/requests/${id}/response`, data).then(res => {
            dispatch({
                type: RESPONSE_REQUEST,
                payload: res.data.data
            });
            NotificationManager.success("Hỗ trợ thành công !")
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}

export const createRequest = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/requests', data).then(res => {
            console.log(res);
            dispatch({
                type: CREATE_REQUEST,
                payload: res.data.data
            });
            NotificationManager.success("Thêm mới yêu cầu thành công !")
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            // NotificationManager.error(err.response.data.msg);
            reject(err);
        });

    });
}

export const downloadRequest = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/requests/export', filter).then(res => {
            console.log(res);
            dispatch({
                type: DOWNLOAD_REQUEST,
                payload: res.data.data
            });
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        });

    });
}
