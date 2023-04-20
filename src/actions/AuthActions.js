import firebase from 'firebase/compat';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';

import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  VOUCHER_CODE_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  SIGNUP_FORM,
  FORGOT_PASSWORD,
  START_AUTH_LOADING,
  STOP_AUTH_LOADING
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const firstNameChanged = (text) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text
  };
};

export const lastNameChanged = (text) => {
  return {
    type: LAST_NAME_CHANGED,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
  /* return the text value without any transformation */
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const voucherCodeChanged = (text) => {
  return {
    type: VOUCHER_CODE_CHANGED,
    payload: text
  };
};

export const signupForm = () => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_FORM });
    Actions.SignUpFormRoute();
  };
};

export const resetPassword = (email) => {
  return (dispatch) => {
    dispatch({ type: START_AUTH_LOADING });
    //comeback clean dispatch({ type: FORGOT_PASSWORD });
    let auth = firebase.auth();
    auth.sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
        Alert.alert(
          'Info',
          'A reset link has been sent to this email address',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
        Actions.pop();
        dispatch({ type: STOP_AUTH_LOADING });
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
        Alert.alert(
          'Error',
          error.message,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
        dispatch({ type: STOP_AUTH_LOADING });
      });
  };
};

export const loginUser = ({ email, password }, staySignedIn) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER }); // dispatch redux action

    function signIn() {
      firebase.auth().signInWithEmailAndPassword(email.toLowerCase(), password)
        .then(async (user) => {
          loginUserSuccess(dispatch, user)
          if(staySignedIn) {
            let user = {
              email: email.toLowerCase(),
              password: password
            }
            await AsyncStorage.setItem('User', JSON.stringify(user))
          }
        })
        .catch((error) => { console.log({ error }); loginUserFail(dispatch, error) });
    }

    // const persistenceType = staySignedIn ? 'LOCAL' : 'NONE';

    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence[persistenceType])
    //   .then(function () {
        signIn();
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  };
};

export const registerUser = ({ firstName, lastName, email, password, voucherCode }) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER }); // dispatch redux action

    // check for required fields
    // create new user, get reference to user account
    // update first name, last name
    // forward to first screen - this action automatically logs in user

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => registerUserSuccess(dispatch, user))
      .catch((error) => registerUserFail(dispatch, error));
  };
};


const loginUserFail = (dispatch, error) => {
  Reactotron.log(error);
  dispatch({ type: LOGIN_USER_FAIL, payload: error.message });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const registerUserFail = (dispatch, error) => {
  Reactotron.log(error);
  dispatch({ type: REGISTER_USER_FAIL, payload: error.message });
};

const registerUserSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};
