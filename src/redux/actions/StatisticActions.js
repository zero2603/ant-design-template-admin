import {
    STATISTIC_GENERAL,
    STATISTIC_PRODUCTS,
    STATISTIC_PRODUCTS_BY_CATEGORY,
    STATISTIC_SUPPORT_REQUESTS,
    STATISTIC_USERS,
    STATISTIC_REVENUE_IN_MONTH,
    GET_REPORT_OF_USER,
    STATISTIC_CUSTOMER_IN_MONTH,
    STATISTIC_COUNT_REQUESTS,
    STATISTIC_CATEGORY,
    STATISTIC_PRODUCT_HISTORY,
    STATISTIC_PENDING,
    STATISTIC_COUNT_HISTORY_CHANGE,
    GET_REPORT_OF_STAFFS,
    STATISTIC_BY_USER,
    STATISTIC_REVENUES,
    STATISTIC_BUSINESS_REVENUES
} from './types';
import api from '../../utils/api';

export const statisticGeneral = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/general').then(res => {
            dispatch({ type: STATISTIC_GENERAL, payload: res.data.data })
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticProducts = (filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/products', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_PRODUCTS, payload: { data: res.data.data, type: filter.type ? filter.type : 1 } })
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticProductsByCategory = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/products-by-category').then(res => {
            dispatch({ type: STATISTIC_PRODUCTS_BY_CATEGORY, payload: res.data.data })
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticSupportRequest = (filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/support-requests', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_SUPPORT_REQUESTS, payload: res.data.data })
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticUser = (filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/users').then(res => {
            dispatch({ type: STATISTIC_USERS, payload: res.data.data })
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

// export const statisticRevenueInMonth = (filter = {}) => dispatch => {
//     return new Promise((resolve, reject) => {
//         return api.get('/statistic/revenue-in-month', { params: filter }).then(res => {
//             dispatch({ type: STATISTIC_REVENUE_IN_MONTH, payload: res.data.data })
//             resolve(true);
//         }).catch(err => {
//             reject(err);
//         })
//     })
// }

export const getReportOfUser = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/report', { params: filter }).then(res => {
            dispatch({ type: GET_REPORT_OF_USER, payload: res.data.data });
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * 
 * @param {*} filter 
 * get total revenue of all business staff
 */
export const getReportOfStaffs = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/business-staffs', { params: filter }).then(res => {
            dispatch({ type: GET_REPORT_OF_STAFFS, payload: res.data.data });
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticCustomerInMonth = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/customers', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_CUSTOMER_IN_MONTH, payload: res.data.data });
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticCountRequests = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/count-requests', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_COUNT_REQUESTS, payload: res.data.data });
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticCategory = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/categories', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_CATEGORY, payload: res.data.data });
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticProductHistory = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/history', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_PRODUCT_HISTORY, payload: res.data.data });
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticPending = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/pending').then(res => {
            dispatch({ type: STATISTIC_PENDING, payload: res.data.data });
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticCountHistoryChange = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/count-history-change', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_COUNT_HISTORY_CHANGE, payload: res.data.data });
            resolve(true);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticByUser = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/statistic-by-user', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_BY_USER, payload: res.data.data });
            resolve(res.data.data);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticRevenues = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/revenues', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_REVENUES, payload: res.data.data });
            resolve(res.data.data);
        }).catch(err => {
            reject(err);
        })
    })
}

export const statisticBusinessRevenues = (filter) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/statistic/business-revenues', { params: filter }).then(res => {
            dispatch({ type: STATISTIC_BUSINESS_REVENUES, payload: res.data.data });
            resolve(res.data.data);
        }).catch(err => {
            reject(err);
        })
    })
}