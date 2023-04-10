import {DECISION_UPDATE, DECISION_CREATE, DECISION_STATE_RESET, START_DECISION_LOADING, STOP_DECISION_LOADING} from '../actions/types';

const INITIAL_STATE = {
    decision: '',
    last_updated: '',
    uid: '',
    loading: false
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        //action.payload === {prop: name, value: 'Jane'}
        case DECISION_UPDATE:
          return {
            ...state,
            [action.payload.prop]: action.payload.value
          };
        case DECISION_CREATE:
          return {INITIAL_STATE};

        case DECISION_STATE_RESET:
          return {INITIAL_STATE};

        case START_DECISION_LOADING:
          return {
            ...state,
            loading: true
          }

        case STOP_DECISION_LOADING:
          return {
            ...state,
            loading: false
          }

        default:
            return state;
    }
}
