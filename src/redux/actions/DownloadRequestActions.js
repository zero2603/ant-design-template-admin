import api from '../../utils/api';
import {
    CREATE_DOWNLOAD_REQUEST,
    CONFIRM_DOWNLOAD_REQUEST
} from './types';
import { NotificationManager } from 'react-notifications';

export const createDownloadRequest = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/download-requests', data).then(res => {
            dispatch({type: CREATE_DOWNLOAD_REQUEST, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const confirmDownloadRequest = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/download-requests/${id}/confirm`, data).then(res => {
            dispatch({type: CONFIRM_DOWNLOAD_REQUEST, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}