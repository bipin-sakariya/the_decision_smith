import {EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS, EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_STATE_RESET}from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: '',
    uid: ''
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
            // action.payload === {prop: name, value: 'Jane'}
        case EMPLOYEE_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value

            };
        case EMPLOYEE_CREATE:
            return {INITIAL_STATE};
        case EMPLOYEE_SAVE_SUCCESS:
            return {INITIAL_STATE};
        case EMPLOYEE_STATE_RESET:
            return {INITIAL_STATE};
        default:
            return state;
    }
}
