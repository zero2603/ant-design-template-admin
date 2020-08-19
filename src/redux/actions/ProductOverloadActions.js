import api from '../../utils/api';
import {
    LIST_ALL_PRODUCT_OVERLOAD_ALERTS,
    DOWNLOAD_PRODUCT_OVERLOAD_ALERTS
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllProductOverloadAlerts = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/product-overload', {params: filter}).then(res => {
            dispatch({type: LIST_ALL_PRODUCT_OVERLOAD_ALERTS, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const downloadProductOverloadAlerts = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/product-overload/export', filter).then(res => {
            dispatch({type: DOWNLOAD_PRODUCT_OVERLOAD_ALERTS, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}