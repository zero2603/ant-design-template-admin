import {
    GET_ALL_WAREHOUSES,
    CREATE_NEW_WAREHOUSE,
    UPDATE_SPECIFIC_WAREHOUSE,
    GET_SPECIFIC_WAREHOUSE,
    REMOVE_WAREHOUSES
} from './types';
import {NotificationManager} from 'react-notifications';
import api from '../../utils/api';

export const getAllWareHouses = filter => dispatch => {
    return new Promise((reslove, reject) => {
        return api.get('./warehouses', {params: filter}).then(res => {
            dispatch({type: GET_ALL_WAREHOUSES, payload: res.data.data});
            reslove(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const getWareHouse = id => dispatch => {
    return new Promise((reslove, reject) => {
        return api.get(`./warehouses/${id}`).then(res => {
            dispatch({type: GET_SPECIFIC_WAREHOUSE, payload: res.data.data});
            reslove(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const createWareHouse = data => dispatch => {
    return new Promise((reslove, reject) => {
        return api.post('./warehouses', data).then(res => {
            dispatch({type: CREATE_NEW_WAREHOUSE, payload: res.data.data});
            NotificationManager.success("Thêm mới thành công!")
            reslove(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const updateWareHouse = (id, data) => dispatch => {
    return new Promise((reslove, reject) => {
        return api.put(`./warehouses/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_WAREHOUSE, payload: res.data.data});
            NotificationManager.success('Cập nhật thành công!')
            reslove(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const removeWareHouses = ids => dispatch => {
    return new Promise((reslove, reject) => {
        return api.delete('./warehouses', {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_WAREHOUSES, payload: ids});
            NotificationManager.success("Xoá thành công!");
            reslove(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

