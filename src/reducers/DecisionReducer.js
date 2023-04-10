import {DECISION_FETCH_SUCCESS, SELECTED_DECISION_STATE_RESET} from '../actions/types';
import Reactotron from 'reactotron-react-native';

const INITIAL_STATE = {};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DECISION_FETCH_SUCCESS:
      return action.payload;

    case SELECTED_DECISION_STATE_RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
}
