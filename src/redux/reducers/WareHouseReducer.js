import {
    GET_ALL_WAREHOUSES,
    GET_SPECIFIC_WAREHOUSE,
    CREATE_NEW_WAREHOUSE,
    UPDATE_SPECIFIC_WAREHOUSE,
    REMOVE_WAREHOUSES
} from '../actions/types';

const INIT_STATE = {
    wareHouses: [],
    currentWareHouse: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state= INIT_STATE, action) => {
    switch(action.type){
        case GET_ALL_WAREHOUSES : {
            return {
                ...state,
                wareHouses: action.payload.data,
                currentWareHouse: null,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page)
                }
            };
        }

        case GET_SPECIFIC_WAREHOUSE : {
            return {
                ...state,
                currentWareHouse: action.payload
            };
        }

        case CREATE_NEW_WAREHOUSE : {
            return {
                ...state,
                wareHouses: [action.payload,...state.wareHouses],
                total: state.total +1
            };
        }

        case UPDATE_SPECIFIC_WAREHOUSE : {
            let index = state.wareHouses.findIndex((wareHouse) => {
                return wareHouse.id == action.payload.id; 
            });

            let temp = [...state.wareHouses];
            temp[index] = action.payload;
            return {...state, wareHouses: temp}
        }

        case UPDATE_SPECIFIC_WAREHOUSE : {
            let index = state.wareHouses.findIndex((wareHouse) => {
                return wareHouse.id == action.payload.id; 
            });

            let temp = [...state.wareHouses];
            temp[index] = action.payload;
            return {...state, wareHouses: temp}
        }

        case REMOVE_WAREHOUSES : {
            let temp = state.wareHouses.filter(wareHouse => {
                return action.payload.indexOf(wareHouse.id) < 0; 
            });
            return {...state, wareHouses: temp}
        }

        default:
            return {...state}


    }
}
