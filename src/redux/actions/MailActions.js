import { NotificationManager } from 'react-notifications';
import {
    SEND_MAIL,
    GET_MAIL_TEMPLATE,
    UPDATE_MAIL_TEMPLATE
} from './types';
import api from '../../utils/api';

export const sendMail = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/mail/send-many', data).then(res => {
            dispatch({type: SEND_MAIL, payload: res.data.data});
            NotificationManager.success("Gửi mail thành công")
            resolve(true);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

export const sendMailToSpecificCustomer = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/mail/send', data).then(res => {
            dispatch({type: SEND_MAIL, payload: res.data.data});
            NotificationManager.success("Gửi mail thành công")
            resolve(true);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

export const getMailTemplate = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/mail/templates/${id}`).then(res => {
            dispatch({type: GET_MAIL_TEMPLATE, payload: res.data.data});
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

export const updateMailTemplate = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/mail/templates/${id}`, data).then(res => {
            dispatch({type: UPDATE_MAIL_TEMPLATE, payload: res.data.data});
            NotificationManager.success("Cập nhật thành công")
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}