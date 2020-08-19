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
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    general: {},
    product: {
        activeProducts: [],
        canceledProducts: []
    },
    productsByCategory: [],
    request: {
        processing_requests: [],
        requests_by_type: [],
        requests_by_status: []
    },
    countRequests: {
        items: [],
        pagination: {
            currentPage: 1,
            total: 0,
            perPage: 10
        }
    },
    users: [],
    revenues: {},
    report: {
        user: {},
        products: [],
        real_revenue: 0
    },
    reportOfStaffs: [],
    customers: [],
    categories: [],
    productHistory: {
        items: [],
        pagination: {
            currentPage: 1,
            total: 0,
            perPage: 10
        }
    },
    pending: {
        products: 0,
        support_requests: 0
    },
    historyChanges: 0,
    statisticByUser: {
        productsByCategory: [],
        revenues: {},
        totalRevenues: []
    },
    statisticRevenues: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case STATISTIC_GENERAL: {
            return {
                ...state,
                general: action.payload
            }
        }
        case STATISTIC_PRODUCTS: {
            let product = { ...state.product };
            if (action.payload.type == 1) {
                product.activeProducts = action.payload.data;
            } else if (action.payload.type == 2) {
                product.canceledProducts = action.payload.data;
            }

            return {
                ...state,
                product: product
            }
        }
        case STATISTIC_PRODUCTS_BY_CATEGORY: {
            return {
                ...state,
                productsByCategory: action.payload
            }
        }
        case STATISTIC_SUPPORT_REQUESTS: {
            return {
                ...state,
                request: action.payload
            }
        }
        case STATISTIC_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }
        case STATISTIC_BUSINESS_REVENUES: {
            return {
                ...state,
                revenues: action.payload,
            }
        }
        case GET_REPORT_OF_USER: {
            return { ...state, report: action.payload };
        }
        case GET_REPORT_OF_STAFFS: {
            return {
                ...state,
                reportOfStaffs: action.payload
            }
        }
        case STATISTIC_CUSTOMER_IN_MONTH: {
            return { ...state, customers: action.payload };
        }
        case STATISTIC_COUNT_REQUESTS: {
            return {
                ...state,
                countRequests: {
                    items: action.payload.data,
                    pagination: {
                        currentPage: action.payload.current_page,
                        total: action.payload.total,
                        perPage: action.payload.per_page
                    }
                },
            }
        }
        case STATISTIC_CATEGORY: {
            return {
                ...state,
                categories: action.payload
            }
        }
        case STATISTIC_PRODUCT_HISTORY: {
            return {
                ...state,
                productHistory: {
                    items: action.payload.data,
                    pagination: {
                        currentPage: action.payload.current_page,
                        total: action.payload.total,
                        perPage: action.payload.per_page
                    }
                }
            }
        }
        case STATISTIC_PENDING: {
            return {
                ...state,
                pending: {
                    products: action.payload.products,
                    support_requests: action.payload.support_requests
                }
            }
        }
        case STATISTIC_COUNT_HISTORY_CHANGE: {
            return {
                ...state,
                historyChanges: action.payload.history_changes
            }
        }
        case STATISTIC_BY_USER: {
            return {
                ...state,
                statisticByUser: action.payload
            }
        }
        case STATISTIC_REVENUES: {
            return {
                ...state,
                statisticRevenues: action.payload
            }
        }
        default: return { ...state };
    }
}
