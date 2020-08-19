import api from "../../utils/api";
import {
    GET_ALL_PENDING_CUSTOMERS,
    CREATE_SUPPORT_CALL_NOTE,
    GET_OLD_NOTES_OF_SPECIFIC_CUSTOMER
} from "./types";
import { NotificationManager } from "react-notifications";

export const getAllPendingCustomers = (filter) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api
            .get("/customer-support-calls/pending", { params: filter })
            .then((res) => {
                dispatch({ type: GET_ALL_PENDING_CUSTOMERS, payload: res.data.data });
                resolve(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error(err.response.data.msg);
                reject(err);
            });
    });
};

export const createSupportCallNote = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api
            .post("/customer-support-calls", data)
            .then((res) => {
                console.log(res.data.data);
                dispatch({ type: CREATE_SUPPORT_CALL_NOTE, payload: res.data.data });
                NotificationManager.success("Thêm mới thành công!");
                resolve(res.data.data);
            })
            .catch((err) => {
                NotificationManager.error(err.response.data.msg);
                reject(err);
            });
    });
};

export const getAllNoteOfCustomer = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api
            .get("/customer-support-calls/note", { params: {customer_id: id} })
            .then((res) => {
                dispatch({ type: GET_OLD_NOTES_OF_SPECIFIC_CUSTOMER, payload: res.data.data });
                resolve(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error(err.response.data.msg);
                reject(err);
            });
    });
};