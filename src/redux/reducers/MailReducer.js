import {
    GET_MAIL_TEMPLATE,
    UPDATE_MAIL_TEMPLATE
} from '../actions/types';

const INIT_STATE = {
    currentTemplate: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MAIL_TEMPLATE: {
            return { ...state, currentTemplate: action.payload };
        }
        case UPDATE_MAIL_TEMPLATE: {
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}