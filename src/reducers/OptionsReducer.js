import {OPTIONS_FETCH_SUCCESS, OPTIONS_STATE_RESET} from '../actions/types';

const INITIAL_STATE = {};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPTIONS_FETCH_SUCCESS:
      return action.payload;

    case OPTIONS_STATE_RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
}
