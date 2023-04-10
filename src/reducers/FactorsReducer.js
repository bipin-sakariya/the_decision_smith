import {FACTORS_FETCH_SUCCESS, FACTORS_STATE_RESET} from '../actions/types';

const INITIAL_STATE = {};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FACTORS_FETCH_SUCCESS:
            return action.payload;

        case FACTORS_STATE_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
}
