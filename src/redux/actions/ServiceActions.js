import api from '../../utils/api';
import {
    GET_ALL_SERVICES,
    GET_SPECIFIC_SERVICE,
    UPDATE_SPECIFIC_SERVICE,
    CREATE_NEW_SERVICE,
    REMOVE_SERVICES,
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllServices = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/services', {params: filter}).then(res => {
            dispatch({type: GET_ALL_SERVICES, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createService = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/services', data).then(res => {
            dispatch({type: CREATE_NEW_SERVICE, payload: res.data.data});
            NotificationManager.success("Thêm mới sản phẩm thành công!");
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const getService = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/services/${id}`).then(res => {
            dispatch({type: GET_SPECIFIC_SERVICE, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const updateService = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/services/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_SERVICE, payload: res.data.data});
            NotificationManager.success("Cập nhật sản phẩm thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeServices = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/services`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_SERVICES, payload: ids});
            NotificationManager.success("Xoá sản phẩm thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const uploadServiceImage = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/services/${id}/upload-image`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_SERVICE, payload: res.data.data});
            NotificationManager.success("Cập nhật sản phẩm thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeServiceImage = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/services/${id}/remove-image`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_SERVICE, payload: res.data.data});
            NotificationManager.success("Cập nhật sản phẩm thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}
