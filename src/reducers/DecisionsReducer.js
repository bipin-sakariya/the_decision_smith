import {DECISIONS_FETCH_SUCCESS} from '../actions/types';

const INITIAL_STATE = {};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DECISIONS_FETCH_SUCCESS:
            console.log("decision updated, updating state:decisions");
            return action.payload;

        default:
            return state;
    }
}
