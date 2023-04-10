import {
    REGISTER_DECISION_ID, DECISION_STATE_RESET
} from '../actions/types';

const INITIAL_STATE = {
  decisionId:''
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_DECISION_ID:
            return action.payload;
            
        case DECISION_STATE_RESET:
          return {INITIAL_STATE};
        default:
            return state;
    }
}
