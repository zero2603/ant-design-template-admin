import api from '../../utils/api';
import {
    GET_ALL_DATACENTER_REQUESTS,
    GET_SPECIFIC_DATACENTER_REQUEST,
    UPDATE_SPECIFIC_DATACENTER_REQUEST,
    CREATE_NEW_DATACENTER_REQUEST,
    REMOVE_DATACENTER_REQUESTS,
    DOWNLOAD_DATACENTER_REQUESTS
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllDatacenterRequests = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/datacenter-requests', {params: filter}).then(res => {
            dispatch({type: GET_ALL_DATACENTER_REQUESTS, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createDatacenterRequest = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/datacenter-requests', data).then(res => {
            dispatch({type: CREATE_NEW_DATACENTER_REQUEST, payload: res.data.data});
            NotificationManager.success("Thêm mới yêu cầu thành công!");
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const getDatacenterRequest = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/datacenter-requests/${id}`).then(res => {
            dispatch({type: GET_SPECIFIC_DATACENTER_REQUEST, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeDatacenterRequests = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/datacenter-requests`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_DATACENTER_REQUESTS, payload: ids});
            NotificationManager.success("Xoá yêu cầu thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const downloadDatacenterRequests = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/datacenter-requests/export`, filter).then(res => {
            dispatch({type: DOWNLOAD_DATACENTER_REQUESTS, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}
