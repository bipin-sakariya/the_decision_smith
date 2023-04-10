import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';

import {
  DECISION_UPDATE,
  DECISION_CREATE,
  DECISION_STATE_RESET,
  DECISIONS_FETCH_SUCCESS,
  DECISION_FETCH_SUCCESS,
  DECISION_SAVE_SUCCESS,
  REGISTER_DECISION_ID,
  SELECTED_DECISION_STATE_RESET,
  START_DECISION_LOADING,
  STOP_DECISION_LOADING
} from './types';

export const registerDecisionId = ({decisionId}) => {
  return {type: REGISTER_DECISION_ID, payload: decisionId};
};

export const decisionUpdate = ({prop, value}) => {
  return {
    type: DECISION_UPDATE,
    payload: {
      prop,
      value
    }
  };
};

export const decisionCreate = ({decision, last_updated}) => {
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase

  return (dispatch) => {

    const decisionRef = firebase.database().ref(`/users/${currentUser.uid}/decisions`);
    const newDecision = decisionRef.push();
    const newDecisionId = newDecision.key;
    newDecision.update({decision, last_updated}).then(() => {
      dispatch({type: DECISION_CREATE});
      dispatch({type: REGISTER_DECISION_ID, payload: newDecisionId});
      Actions.OptionsListRoute({decisionId: newDecisionId}); // need a handle to new id
    });

  }
};

  export const getDecision = ({decisionId}) => {

    const {currentUser} = firebase.auth();
    return (dispatch) => {
      const decisionRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}`);
      decisionRef.once("value").then(function(snapshot) {
        dispatch({type: DECISION_FETCH_SUCCESS, payload: snapshot.val()});
      });
    }

};

export const decisionEdit = ({uid, decision, last_updated}) => {
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase
  console.log(`DECISION EDIT WITH: ${uid} ${decision} ${last_updated}`);
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/decisions/${uid}`).update({decision, last_updated}).then((edited_decision) => {
      dispatch({type: DECISION_SAVE_SUCCESS});
      console.log('Decision uid:', uid);
      Actions.OptionsListRoute({decisionId: uid});
    });
  }
  return;
};

const loadingToggle = (dispatch, val) => {
  dispatch({
    type: val
  });
}

export const decisionDelete = ({uid}) => {
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase
  return (dispatch) => {
    loadingToggle(dispatch, START_DECISION_LOADING);
    firebase.database().ref(`/users/${currentUser.uid}/decisions/${uid}`).remove().then(() => {
      loadingToggle(dispatch, STOP_DECISION_LOADING);
      //Actions.DecisionListRoute({type: 'reset'});
      Actions.pop();
    });
  }
  return;
};

export const decisionsFetch = () => {

  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/decisions`).on('value', snapshot => {
      dispatch({type: DECISIONS_FETCH_SUCCESS, payload: snapshot.val()});
    });
  }
};

export const decisionStateReset = () => {

  return {type: DECISION_STATE_RESET};
}

export const selectedDecisionStateReset = () => {

  return {type: SELECTED_DECISION_STATE_RESET};
}
