import { NotificationManager } from 'react-notifications';
import {
   GET_CONFIG,
   SET_CONFIG
} from './types';
import api from '../../utils/api';

export const getConfig = () => dispatch => {
    return api.get('/config/get').then(res => {
        dispatch({type: GET_CONFIG, payload: res.data.data})
    }).catch(err => {
        console.log(err);
    })
}

export const setConfig = (data) => dispatch => {
    return api.post('/config/update', data).then(res => {
        dispatch({type: SET_CONFIG});
        NotificationManager.success("Cập nhật thành công");
    }).catch(err => {
        console.log(err);
    })
}