import axios from 'axios';
import { getCookie, removeCookie } from './cookie';
import appConfig from '../config';
import { NotificationManager } from 'react-notifications';

const api = axios.create({
    baseURL: `${appConfig.API_URL}`,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
});

api.interceptors.request.use(function (config) {
    let accessToken = getCookie('gdata_admin_token');
    // Do something before request is sent
    if (accessToken) {
        config.headers.common['Authorization'] = "Bearer " + accessToken
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    error => {
        console.log(error)
        if (error.response.status === 401) {
            removeCookie('gdata_admin_token')
            let message = "Phiên đã hết hạn. Vui lòng đăng nhập lại!";
            if (error.response.data.message) {
                message = error.response.data.message;
            }

            if (window.location.pathname != '/admin/login' && window.location.pathname != '/admin/reset-password') {
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
                NotificationManager.error(message);
                window.location.href = '/admin/login'
            }
        }
        return Promise.reject(error);
    }
);

export default api;