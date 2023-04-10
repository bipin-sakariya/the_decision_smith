import { PAY_OPTION } from '../actions/types';

const INITIAL_STATE = '';

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAY_OPTION:
      return action.payload;

    default:
      return state;
  }
}
