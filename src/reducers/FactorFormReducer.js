import {FACTOR_UPDATE, FACTOR_CREATE, FACTOR_FORM_STATE_RESET, STOP_FACTOR_LOADING} from '../actions/types';

const INITIAL_STATE = {
  factor: '',
  loading: false
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FACTOR_UPDATE:
          return {
            ...state,
            [action.payload.prop]: action.payload.value
          };
        case FACTOR_CREATE:
          return {INITIAL_STATE};

        case FACTOR_FORM_STATE_RESET:
          return {INITIAL_STATE};

        case STOP_FACTOR_LOADING:
          return {
            ...state,
            loading: false
          }

        default:
          return state;
    }
}
