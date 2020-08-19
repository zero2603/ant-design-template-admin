import api from "../../utils/api";
import {
    GET_ALL_SHOPS,
    GET_SPECIFIC_SHOP,
    UPDATE_SPECIFIC_SHOP,
    CREATE_NEW_SHOP,
    REMOVE_SHOPS,
} from "./types";
import { NotificationManager } from "react-notifications";

export const getAllShops = (filter) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api
            .get("/shops", { params: filter })
            .then((res) => {
                dispatch({ type: GET_ALL_SHOPS, payload: res.data.data });
                resolve(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error(err.response.data.msg);
                reject(err);
            });
    });
};

export const createShop = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api
            .post("/shops", data)
            .then((res) => {
                console.log(res.data.data);
                dispatch({ type: CREATE_NEW_SHOP, payload: res.data.data });
                NotificationManager.success("Thêm mới thành công!");
                resolve(res.data.data);
            })
            .catch((err) => {
                NotificationManager.error(err.response.data.msg);
                reject(err);
            });
    });
};

export const getShop = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api
            .get(`/shops/${id}`)
            .then((res) => {
                dispatch({ type: GET_SPECIFIC_SHOP, payload: res.data.data });
                resolve(res.data.data);
            })
            .catch((err) => {
                NotificationManager.error(err.response.data.msg);
                reject(err);
            });
    });
};

export const updateShop = (id, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api
            .put(`/shops/${id}`, data)
            .then((res) => {
                dispatch({
                    type: UPDATE_SPECIFIC_SHOP,
                    payload: res.data.data,
                });
                NotificationManager.success("Cập nhật thành công!");
                resolve(res.data);
            })
            .catch((err) => {
                NotificationManager.error(err.response.data.msg);
                reject(err);
            });
    });
};

export const removeShops = (ids) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api
            .delete(`/shops`, { data: { ids: ids } })
            .then((res) => {
                dispatch({ type: REMOVE_SHOPS, payload: ids });
                NotificationManager.success("Xoá thành công!");
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error(err.response.data.msg);
                reject(err);
            });
    });
};
