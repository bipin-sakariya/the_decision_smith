import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER,
  SIGNUP_FORM,
  FORGOT_PASSWORD,
  VOUCHER_CODE_CHANGED,
  START_AUTH_LOADING,
  STOP_AUTH_LOADING
} from '../actions/types';

// SETUP INITIAL STATE FOR THIS PIECE OF state
const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  voucherCode: '',
  email: '',
  password: '',
  loading: false,
  error: '',
  user: null
};

// Handles Authentication Related concerns
export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };
    case FIRST_NAME_CHANGED:
      return {
        ...state,
        firstName: action.payload
      };
    case LAST_NAME_CHANGED:
      return {
        ...state,
        lastName: action.payload
      };
    case VOUCHER_CODE_CHANGED:
        return {
          ...state,
          voucherCode: action.payload
        };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload
      };
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          ...INITIAL_STATE,
          user : action.payload
        };
    case LOGIN_USER_FAIL:
      let error = 'Login Failure: ' + action.payload
      return {
        ...state,
        error: error,
        password: '',
        loading: false
      };
    case REGISTER_USER_FAIL:
      error = 'Registration Failure: ' + action.payload
      return {
        ...state,
        error: error,
        password: '',
        loading: false
      };
    case LOGIN_USER:

      return {
        ...state,
        loading: true,
        error: ''
      };
    case REGISTER_USER:

      return {
        ...state,
        loading: true,
        error: ''
      };
    case SIGNUP_FORM:
      return {
        ...state,
        ...INITIAL_STATE
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        ...INITIAL_STATE
      };

    case START_AUTH_LOADING:
      return {
        ...state,
        loading: true
      }

    case STOP_AUTH_LOADING:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
};
