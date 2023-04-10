import {OPTION_UPDATE, OPTION_CREATE, OPTION_STATE_RESET, STOP_OPTION_LOADING} from '../actions/types';

const INITIAL_STATE = {
    option: '',
    loading: false
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        //action.payload === {prop: name, value: 'Jane'}
        case OPTION_UPDATE:
          return {
            ...state,
            [action.payload.prop]: action.payload.value
          };
        case OPTION_CREATE:
          return {INITIAL_STATE};

        case OPTION_STATE_RESET:
          return {INITIAL_STATE};

        case STOP_OPTION_LOADING:
          return {
            ...state,
            loading: false
          }

        default:
          return state;
    }
}
