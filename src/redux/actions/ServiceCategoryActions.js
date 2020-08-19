import api from '../../utils/api';
import {
    GET_ALL_SERVICE_CATEGORIES,
    UPDATE_SPECIFIC_SERVICE_CATEGORY,
    CREATE_NEW_SERVICE_CATEGORY,
    REMOVE_SERVICE_CATEGORIES
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllServiceCategories = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/service-categories', {params: filter}).then(res => {
            dispatch({type: GET_ALL_SERVICE_CATEGORIES, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createServiceCategory = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/service-categories', data).then(res => {
            dispatch({type: CREATE_NEW_SERVICE_CATEGORY, payload: res.data.data});
            NotificationManager.success("Thêm mới danh mục thành công!");
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const updateServiceCategory = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/service-categories/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_SERVICE_CATEGORY, payload: res.data.data});
            NotificationManager.success("Cập nhật danh mục thành công!");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeServiceCategories = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/service-categories`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_SERVICE_CATEGORIES, payload: ids});
            NotificationManager.success("Xoá danh mục thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}
