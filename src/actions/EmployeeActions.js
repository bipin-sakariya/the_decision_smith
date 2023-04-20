import firebase from 'firebase/compat';
import {Actions} from 'react-native-router-flux';

import {EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEE_FETCH, EMPLOYEES_FETCH_SUCCESS, EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_STATE_RESET} from './types';

export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {
            prop,
            value
        }
    };
};

export const employeeCreate = ({name, phone, shift}) => {
    const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
    //update firebase

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`).push({name, phone, shift})
        .then(() => {
          dispatch({type: EMPLOYEE_CREATE});
          Actions.EmployeeListRoute({ type: 'reset'});
        });


    }

};

export const employeeEdit = ({uid, name, phone, shift}) => {
    const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
    //update firebase
    console.log(`EMPLOYEE EDIT WITH: ${uid} ${name} ${phone} ${shift}`);
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`).set({name, phone, shift})
        .then(() => {
          dispatch({type: EMPLOYEE_SAVE_SUCCESS});
          Actions.EmployeeListRoute({ type: 'reset'});
        });
    }
    return;
};

export const employeeFetch = () => {

  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase

  return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot =>{
        dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()});
      });
      //.then((data) => {
      //dispatch({type: EMPLOYEE_FETCH, payload: data});
      //});


  }

}

export const employeeDelete = ({uid}) => {
    const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
    //update firebase
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`).remove()
        .then(() => {
          Actions.EmployeeListRoute({ type: 'reset'});
        });
    }
    return;
};

export const employeeStateReset = () => {
  return {
    type: EMPLOYEE_STATE_RESET
  };
}
