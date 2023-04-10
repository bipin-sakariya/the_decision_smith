import {RES_OPTION_SAVING} from '../actions/types';

const INITIAL_STATE = false;

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RES_OPTION_SAVING:
            return action.payload;

        default:
            return state;
    }
}
