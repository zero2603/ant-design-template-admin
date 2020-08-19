import api from '../../utils/api';
import {
    GET_ALL_TASKS,
    GET_SPECIFIC_TASK,
    UPDATE_SPECIFIC_TASK,
    CREATE_NEW_TASK,
    REMOVE_TASKS
} from '../actions/types';
import { NotificationManager } from 'react-notifications';

export const getAllTasks = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/tasks', {params: filter}).then(res => {
            dispatch({type: GET_ALL_TASKS, payload: res.data.data});
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const createTask = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/tasks', data).then(res => {
            dispatch({type: CREATE_NEW_TASK, payload: res.data.data});
            NotificationManager.success("Thêm mới công việc thành công!");
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const getTask = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/tasks/${id}`).then(res => {
            dispatch({type: GET_SPECIFIC_TASK, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const updateTask = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/tasks/${id}`, data).then(res => {
            dispatch({type: UPDATE_SPECIFIC_TASK, payload: res.data.data});
            NotificationManager.success("Cập nhật công việc thành công!");
            resolve(res.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}

export const removeTasks = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/tasks`, {data: {ids: ids}}).then(res => {
            dispatch({type: REMOVE_TASKS, payload: ids});
            NotificationManager.success("Xoá công việc thành công!");
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            NotificationManager.error(err.response.data.msg);
            reject(err);
        })
    })
}
