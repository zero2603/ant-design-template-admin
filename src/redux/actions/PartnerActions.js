import api from '../../utils/api';
import {
    GET_ALL_PARTNERS,
    GET_SPECIFIC_PARTNER,
    UPDATE_SPECIFIC_PARTNER,
    CREATE_NEW_PARTNER,
    REMOVE_PARTNERS
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllPartners = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/partners', {params: filter}).then(res => {
            dispatch({type: GET_ALL_PARTNERS, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createPartner = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/partners', data).then(res => {
            dispatch({type: CREATE_NEW_PARTNER, payload: res.data.data});
            NotificationManager.success("Thêm mới hợp đồng thành công!");
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const getPartner = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/partners/${id}`).then(res => {
            dispatch({type: GET_SPECIFIC_PARTNER, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const updatePartner = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/partners/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_PARTNER, payload: res.data.data});
            NotificationManager.success("Cập nhật hợp đồng thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removePartners = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/partners`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_PARTNERS, payload: ids});
            NotificationManager.success("Xoá hợp đồng thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}
