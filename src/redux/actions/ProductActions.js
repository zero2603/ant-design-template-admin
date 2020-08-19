import api from '../../utils/api';
import {
    GET_ALL_PRODUCTS,
    GET_SPECIFIC_PRODUCT,
    CREATE_NEW_PRODUCT,
    UPDATE_SPECIFIC_PRODUCT,
    REMOVE_PRODUCTS,
    CREATE_EXPLANATIONS,
    CREATE_CONTRACT,
    CREATE_RENEWAL_MAIL,
    UPDATE_RENEWAL_MAIL,
    REMOVE_RENEWAL_MAIL,
    DOWNLOAD_PRODUCT_DATA,
    SEND_POSTAGE,
    SEND_OVERLOAD_ALERT,
    GET_RENEWED_PRODUCTS,
    GET_LATEST_PRODUCT_OF_CUSTOMER,
    DOWNLOAD_PRODUCT_HISTORIES,
    REMOVE_CONTRACT
} from './types';
import { NotificationManager } from 'react-notifications'

export const getAllProducts = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/products', { params: filter }).then(res => {
            dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.data });
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

export const getRenewedProducts = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/products/renewed', { params: filter }).then(res => {
            dispatch({ type: GET_RENEWED_PRODUCTS, payload: res.data.data });
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

export const getSpecificProduct = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/products/${id}`).then(res => {
            dispatch({ type: GET_SPECIFIC_PRODUCT, payload: res.data.data });
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

export const createProduct = data => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/products', data).then(res => {
            dispatch({
                type: CREATE_NEW_PRODUCT,
                payload: res.data.data
            });
            NotificationManager.success("Thêm mới dịch vụ thành công!");
            resolve(res.data.data);
        }).catch(err => {
            console.log(err.response.data.msg);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const updateProduct = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/products/${id}`, data).then(res => {
            dispatch({
                type: UPDATE_SPECIFIC_PRODUCT,
                payload: res.data.data
            });
            NotificationManager.success("Cập nhật dịch vụ thành công!")
            resolve(res.data)
        }).catch(err => {
            console.log(err.response.data.msg);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const removeProducts = ids => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete('/products', { data: { ids: ids } }).then(res => {
            dispatch({
                type: REMOVE_PRODUCTS,
                payload: ids
            });
            NotificationManager.success("Xoá dịch vụ thành công!");
            resolve(res.data.data);
        }).catch(err => {
            console.log(err);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const createExplanations = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/products/${id}/explanations`, data).then(res => {
            dispatch({
                type: CREATE_EXPLANATIONS,
                payload: res.data
            });
            NotificationManager.success("Thêm thành công!")
            resolve(res.data)
        }).catch(err => {
            console.log(err.response.data);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const createRenewalMail = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/products/${id}/renewal-mail`, data).then(res => {
            dispatch({ type: CREATE_RENEWAL_MAIL, payload: res.data.data });
            NotificationManager.success("Thêm mới thành công!")
            resolve(true);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const updateRenewalMail = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/products/renewal-mail/${id}`, data).then(res => {
            dispatch({ type: UPDATE_RENEWAL_MAIL, payload: res.data.data });
            NotificationManager.success("Cập nhật thành công!")
            resolve(true);
        }).catch(err => {
            console.log(err.response);
            // NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const removeRenewalMail = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/products/renewal-mail/${id}`).then(res => {
            dispatch({ type: REMOVE_RENEWAL_MAIL, payload: id });
            NotificationManager.success("Xoá thành công!")
            resolve(true);
        }).catch(err => {
            console.log(err.response);
            // NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const addContract = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/products/${id}/contracts`, data).then(res => {
            dispatch({
                type: CREATE_CONTRACT,
                payload: res.data.data
            });
            NotificationManager.success("Thêm  thành công!")
            resolve(res.data)
        }).catch(err => {
            console.log(err.response.data);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const removeContract = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.delete(`/products/contracts/${id}`).then(res => {
            dispatch({ type: REMOVE_CONTRACT, payload: id });
            NotificationManager.success("Xoá thành công!")
            resolve(true);
        }).catch(err => {
            console.log(err.response);
            // NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const downloadProductData = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/products/export`, filter).then(res => {
            dispatch({ type: DOWNLOAD_PRODUCT_DATA, payload: res.data.data });
            resolve(res.data.data);
        }).catch(err => {
            console.log(err.response);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const sendPostage = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/products/postage`, data).then(res => {
            dispatch({ type: SEND_POSTAGE, payload: res.data.data });
            NotificationManager.success("Gửi thông báo thành công!")
            resolve(true);
        }).catch(err => {
            console.log(err.response);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const getListIpByCustomer = (customer) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/ip`, { params: { customer: customer } }).then(res => {
            resolve(res.data.data);
        }).catch(err => {
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const sendOverloadAlert = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/products/overload`, data).then(res => {
            dispatch({ type: SEND_OVERLOAD_ALERT, payload: res.data.data });
            NotificationManager.success("Gửi thông báo thành công!")
            resolve(true);
        }).catch(err => {
            console.log(err.response);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const getLatestProductOfCustomer = (customer_id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/products/latest?customer=${customer_id}`).then(res => {
            dispatch({ type: GET_LATEST_PRODUCT_OF_CUSTOMER, payload: res.data.data });
            resolve(res.data.data);
        }).catch(err => {
            console.log(err.response);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    })
}

export const updateProductIP = (id, data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.put(`/update-product-ip/${id}`, data).then(res => {
            dispatch({
                type: UPDATE_SPECIFIC_PRODUCT,
                payload: res.data.data
            });
            NotificationManager.success("Cập nhật dịch vụ thành công!")
            resolve(res.data)
        }).catch(err => {
            console.log(err.response.data);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}

export const downloadProductHistory = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/export-product-history`).then(res => {
            dispatch({
                type: DOWNLOAD_PRODUCT_HISTORIES,
                payload: res.data.data
            });
            resolve(res.data.data)
        }).catch(err => {
            console.log(err.response.data);
            NotificationManager.error(err.response.data.msg);
            reject(err);
        });
    });
}