import {RES_FACTOR_SAVING} from '../actions/types';

const INITIAL_STATE = false;

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RES_FACTOR_SAVING:
            return action.payload;

        default:
            return state;
    }
}
