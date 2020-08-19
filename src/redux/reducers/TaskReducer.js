import {
    GET_ALL_TASKS,
    GET_SPECIFIC_TASK,
    UPDATE_SPECIFIC_TASK,
    CREATE_NEW_TASK,
    REMOVE_TASKS
} from '../actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    tasks: [],
    currentTask: null,
    pagination: {
        currentPage: 1,
        total: 0, // total records
        perPage: 10
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TASKS: {
            return {
                ...state,
                tasks: action.payload.data,
                pagination: {
                    currentPage: parseInt(action.payload.current_page),
                    total: parseInt(action.payload.total),
                    perPage: parseInt(action.payload.per_page),
                }
            }
        }
        case GET_SPECIFIC_TASK: {
            return {...state, currentTask: action.payload}
        }
        case CREATE_NEW_TASK: {
            return {...state, tasks: [action.payload, ...state.tasks], total: state.total + 1}
        }
        case UPDATE_SPECIFIC_TASK: {
            let currentTask = state.currentTask;
            currentTask = {
                ...currentTask,
                ...action.payload
            }
            return {...state, currentTask: currentTask}
        }
        case REMOVE_TASKS: {
            let temp = state.tasks.filter(task => {
                return action.payload.indexOf(task.new_id) < 0;
            });
            return {...state, tasks: temp}
        }
        default: return { ...state };
    }
}
