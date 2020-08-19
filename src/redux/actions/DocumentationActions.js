import api from '../../utils/api';
import {
    GET_ALL_DOCUMENTATIONS,
    GET_SPECIFIC_DOCUMENTATION,
    UPDATE_SPECIFIC_DOCUMENTATION,
    CREATE_NEW_DOCUMENTATION,
    REMOVE_DOCUMENTATIONS
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllDocumentations = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/documentations', {params: filter}).then(res => {
            dispatch({type: GET_ALL_DOCUMENTATIONS, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createDocumentation = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/documentations', data).then(res => {
            dispatch({type: CREATE_NEW_DOCUMENTATION, payload: res.data.data});
            NotificationManager.success("Thêm mới tài liệu thành công!");
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const getDocumentation = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/documentations/${id}`).then(res => {
            dispatch({type: GET_SPECIFIC_DOCUMENTATION, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const updateDocumentation = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/documentations/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_DOCUMENTATION, payload: res.data.data});
            NotificationManager.success("Cập nhật tài liệu thành công!");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeDocumentations = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/documentations`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_DOCUMENTATIONS, payload: ids});
            NotificationManager.success("Xoá tài liệu thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}
