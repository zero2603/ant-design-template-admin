import api from '../../utils/api';
import {
    GET_ALL_CATEGORIES,
    GET_SPECIFIC_CATEGORY,
    UPDATE_SPECIFIC_CATEGORY,
    CREATE_NEW_CATEGORY,
    REMOVE_CATEGORIES
} from './types';
import { NotificationManager } from 'react-notifications';

export const getAllCategories = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/categories', {params: filter}).then(res => {
            dispatch({type: GET_ALL_CATEGORIES, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createCategory = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/categories', data).then(res => {
            dispatch({type: CREATE_NEW_CATEGORY, payload: res.data.data});
            NotificationManager.success("Thêm mới danh mục thành công!");
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const getCategory = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/categories/${id}`).then(res => {
            dispatch({type: GET_SPECIFIC_CATEGORY, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const updateCategory = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/categories/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_CATEGORY, payload: res.data.data});
            NotificationManager.success("Cập nhật danh mục thành công!");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeCategories = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/categories`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_CATEGORIES, payload: ids});
            NotificationManager.success("Xoá danh mục thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}
