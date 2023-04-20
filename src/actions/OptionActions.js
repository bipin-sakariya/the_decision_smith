import firebase from 'firebase/compat';
import {Actions} from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';

import {
  OPTION_UPDATE,
  OPTION_CREATE,
  OPTION_STATE_RESET,
  OPTIONS_FETCH_SUCCESS,
  OPTION_SAVE_SUCCESS,
  SCORE_OPTION,
  OPTIONS_STATE_RESET,
  PAY_OPTION,
  STOP_OPTION_LOADING,
  RES_OPTION_SAVING
} from './types';

export const optionUpdate = ({prop, value}) => {
  return {
    type: OPTION_UPDATE,
    payload: {
      prop,
      value
    }
  };
};

const stopLoading = (dispatch) => {
  dispatch({
    type: STOP_OPTION_LOADING
  });
};

export const optionCreate = ({option, decisionId, total}) => {
  console.log(total);

  const {currentUser} = firebase.auth();

  // if (total >= 2) {
  //   return (dispatch) => {
  //     firebase.database().ref(`/users/${currentUser.uid}/payment/options/paid`).on('value', snapshot => {
  //       console.log(snapshot.val());
  //       let val = snapshot.val();
  //       if (val !== true) {
  //         dispatch({
  //           type: PAY_OPTION,
  //           payload: 'options'
  //         })
  //         Actions.PaymentRoute();
  //         stopLoading(dispatch);
  //       } else {
  //         firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`).push({decisionId, option, optionScore: 0, optionScorePercentage: 0, isScored: false}).then((x) => {
  //           console.log('yelp ', x);

  //           dispatch({type: OPTION_CREATE});
  //           Actions.pop();
  //         });
  //       }
  //     });
  //   }
  // } else {
    // No need to check for payment, update firebase
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`).push({decisionId, option, optionScore: 0, optionScorePercentage: 0, isScored: false}).then((x) => {
        console.log('yelp: ', x, x.Reference);

        //Get all factors and add to new option
        let factorArr = [];
        const factorsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors/`).orderByKey();
        factorsRef.once("value").then(function(snapshot) {
          snapshot.forEach(function(factor) {
            var factorId = factor.key;
            factorArr.push({factorId, isScored: false, factor: factor.child("factor").val(), score: 0, weight: factor.child("weight").val()});
          });

          console.log('yels:', x.path, factorArr.length);
          let optionId = x.path.pieces_[x.path.pieces_.length - 1];
          for (var i = 0; i < factorArr.length; i++) {
            OptionScoresRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}/scores`);
            OptionScoresRef.child(factorArr[i].factorId).set({factor: factorArr[i].factor, weight: factorArr[i].weight, isScored: factorArr[i].isScored, score: 0});
          }
        })

        dispatch({type: OPTION_CREATE});
        Actions.pop();
      });
    }
  // }
};

export const optionEdit = ({option, optionId, decisionId}) => {
console.log(optionId);
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}`).update({option}).then(() => {
      dispatch({type: OPTION_SAVE_SUCCESS});
      Actions.pop();
      stopLoading(dispatch);
    });
  }
  return;
};

export const optionDelete = ({decisionId, optionId}) => {
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}`).remove().then(() => {
      Actions.pop();
      stopLoading(dispatch);
    });
  }
  return;
};

export const optionsFetch = (decisionId) => {
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`).on('value', snapshot => {
      Reactotron.log("options snapshot:");
      Reactotron.log(snapshot.val());

      dispatch({type: OPTIONS_FETCH_SUCCESS, payload: snapshot.val()});
    });
  }
};

export const scoreOption = (dataz) => {
  console.log('Rxx');
  console.log("Running score option... ");
  //console.log(optionId, factorId, decisionId, score);
  const {currentUser} = firebase.auth();
  const {decisionId} = dataz[0];
  return (dispatch) => {
    const parentRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`);
    parentRef.once("value").then(function(snapzhot) {
      let parentVal = snapzhot.val();
      console.log('ZI IT: ', parentVal);

      let position = 0;
      let alreadyScoredVal = {};

      for (var i = 0; i < dataz.length; i++) {
        const {optionId, factorId, score} = dataz[i];
        const ScoreRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}/scores/${factorId}`);

        ScoreRef.once("value").then(function(snapshot) {
          var factor = snapshot.child("factor").val();
          var weight = snapshot.child("weight").val();

          var newScore = 0;
          newScore = score * weight;
          parentVal[optionId].scores[factorId].score = newScore;
          parentVal[optionId].scores[factorId].isScored = true;

          // update OptionScore
          var OptionRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}`);
          // iterate scores in this option and tally
          var optionScore = 0;
          OptionRef.once("value").then(function(option) {
            //iterate scores and add up
            //option.child('scores').forEach(function(score){
              //optionScore += score.child("score").val();
            //});

            var scoreVal = option.val();
            var factorPos = 0;
            var eachFactorId;

            for (var prop in scoreVal.scores) {
              if (scoreVal.scores.hasOwnProperty(prop)) {
                eachFactorId = dataz[factorPos] ? dataz[factorPos].factorId : eachFactorId;
                if (prop === eachFactorId && factorId === eachFactorId) {
                  console.log('first: ', optionScore, newScore);
                  optionScore += newScore;
                  alreadyScoredVal[factorId] = newScore;
                } else if(prop === eachFactorId && alreadyScoredVal.hasOwnProperty(eachFactorId)) {
                  console.log('mid:', optionScore, alreadyScoredVal[eachFactorId]);
                  optionScore += alreadyScoredVal[eachFactorId];
                } else {
                  console.log('second: ', optionScore, scoreVal.scores[prop].score);
                  optionScore += scoreVal.scores[prop].score;
                }
                factorPos += 1;
              }
            }

            parentVal[optionId].optionScore = optionScore;
            parentVal[optionId].isScored = true;
            //OptionRef.update({optionScore: optionScore});
            //OptionRef.update({isScored: true});
            const DecisionRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}`);

            DecisionRef.once("value").then(function(decision){
              var perfectScore = decision.child('perfectScore').val();
              var optionScorePercentage = perfectScore > 0 ? Math.ceil((optionScore/perfectScore) * 100) : 0;
              parentVal[optionId].optionScorePercentage = optionScorePercentage;
              //OptionRef.update({optionScorePercentage: optionScorePercentage});
              position += 1;
              if (position === dataz.length) {
                //finished, save
                firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}`).update({options: parentVal})
                .then(() => {
                  console.log('DOne');
                  Actions.pop();
                  dispatch({
                    type: RES_OPTION_SAVING,
                    payload: false
                  });
                })
              }
            });
          });
          //ScoreRef.update({score: newScore});
          //ScoreRef.update({isScored: true});
        })
      };
    })
  }
  return;
};

export const optionStateReset = () => {
  return {type: OPTION_STATE_RESET};
}

export const optionsStateReset = () => {
  return {type: OPTIONS_STATE_RESET};
}
