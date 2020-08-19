import {
    GET_ALL_SHOPS,
    GET_SPECIFIC_SHOP,
    UPDATE_SPECIFIC_SHOP,
    CREATE_NEW_SHOP,
    REMOVE_SHOPS,
} from "../actions/types";

/**
 * initial state
 */
const INIT_STATE = {
    shops: [],
    currentShop: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10,
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_SHOPS: {
            return {
                ...state,
                shops: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                },
            };
        }
        case GET_SPECIFIC_SHOP: {
            return { ...state, currentShop: action.payload };
        }
        case CREATE_NEW_SHOP: {
            return {
                ...state,
                shops: [action.payload, ...state.shops],
                total: state.total + 1,
            };
        }
        case UPDATE_SPECIFIC_SHOP: {
            let index = state.shops.findIndex((shop) => {
                return shop.id == action.payload.id;
            });

            let temp = [...state.shops];
            temp[index] = action.payload;
            return { ...state, shops: temp };
        }
        case REMOVE_SHOPS: {
            let temp = state.shops.filter((shop) => {
                return action.payload.indexOf(shop.id) < 0;
            });
            return { ...state, shops: temp };
        }
        default:
            return { ...state };
    }
};
