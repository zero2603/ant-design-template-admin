import {
    GET_ALL_PRODUCTS,
    GET_RENEWED_PRODUCTS,
    GET_SPECIFIC_PRODUCT,
    CREATE_NEW_PRODUCT,
    UPDATE_SPECIFIC_PRODUCT,
    REMOVE_PRODUCTS,
    CREATE_EXPLANATIONS,
    CREATE_RENEWAL_MAIL,
    UPDATE_RENEWAL_MAIL,
    REMOVE_RENEWAL_MAIL,
    SEND_POSTAGE,
    SEND_OVERLOAD_ALERT,
    CREATE_CONTRACT,
    REMOVE_CONTRACT,
} from '../actions/types';

const INIT_STATE = {
    products: [],
    currentProduct: null,
    pagination: {
        currentPage: 1,
        total: 0,
        perPage: 10
    },
    listNvkd: []
}

export default (state= INIT_STATE, action)=>{
    switch(action.type){
        case GET_ALL_PRODUCTS: 
            return {
                ...state,
                products: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page)
                }
            };
        case GET_RENEWED_PRODUCTS: {
            return {
                ...state,
                products: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page)
                }
            };
        }
        case GET_SPECIFIC_PRODUCT: 
            return {
                ...state,
                currentProduct: action.payload
            };
        case CREATE_NEW_PRODUCT:
            return{
                ...state,
                products: [action.payload, ...state.products],
                total: state.total + 1
            } 
        case UPDATE_SPECIFIC_PRODUCT:
            // let index = state.products.findIndex(product => {
            //     return product.id == action.payload.id
            // });
            // let temp = [...state.products];
            // temp[index] = action.payload
            // return {
            //     ...state,
            //     products: temp
            // } 
            return {
                ...state,
                currentProduct: action.payload
            }
        case REMOVE_PRODUCTS:
            let temp1 = state.products.filter(product => {
                return action.payload.indexOf(product.id) < 0;
            })
            return {
                ...state,
                products: temp1
            }
        case CREATE_EXPLANATIONS: 
            return {
                ...state 
            }
        case CREATE_RENEWAL_MAIL: {
            let product = {...state.currentProduct};
            product.renewal_mails = [...product.renewal_mails, action.payload];

            return {...state, currentProduct: product}
        }
        case UPDATE_RENEWAL_MAIL: {
            let product = {...state.currentProduct};
            let items = [... product.renewal_mails];

            let index = items.findIndex(item => item.id == action.payload.id);
            items[index] = action.payload;
            product.renewal_mails = items;
            
            return {...state, currentProduct: product}
        }
        case REMOVE_RENEWAL_MAIL: {
            let product = {...state.currentProduct};
            product.renewal_mails = product.renewal_mails.filter(item => item.id != action.payload);

            return {...state, currentProduct: product}
        }

        case CREATE_CONTRACT: {
            let product = {...state.currentProduct};
            product.contracts = [...product.contracts, action.payload];

            return {...state, currentProduct: product}
        }
        case REMOVE_CONTRACT: {
            let product = {...state.currentProduct};
            product.contracts = product.contracts.filter(item => item.id != action.payload);

            return {...state, currentProduct: product}
        }

        case SEND_POSTAGE: {
            return {
                ...state
            }
        }
        case SEND_OVERLOAD_ALERT: {
            return {
                ...state,
                currentProduct: {
                    ...state.currentProduct,
                    overloading_alerts: [
                        action.payload,
                        ...state.currentProduct.overloading_alerts
                    ]
                }
            }
        }
        default:
            return {...state}
    }
};
