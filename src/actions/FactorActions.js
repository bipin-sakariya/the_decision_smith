import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';

import {
  FACTOR_UPDATE,
  FACTOR_CREATE,
  FACTOR_FORM_STATE_RESET,
  FACTORS_FETCH_SUCCESS,
  FACTOR_SAVE_SUCCESS,
  WEIGHT_FACTOR,
  FACTORS_STATE_RESET,
  STOP_FACTOR_LOADING,
  PAY_OPTION,
  RES_FACTOR_SAVING
} from './types';

export const factorUpdate = ({prop, value}) => {
  return {
    type: FACTOR_UPDATE,
    payload: {
      prop,
      value
    }
  };
};

export const factorCreate = ({factor, decisionId, total}) => {
  console.log(total);
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...

  function addFactor(dispatch) {
    const factorsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors`);
    const newFactor = factorsRef.push();
    const newFactorId = newFactor.key;

    newFactor.update({decisionId, factor, weight: 5}).then(() => {
      //update scores in options
      const OptionsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`).orderByKey();
      OptionsRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(option) {
          var optionId = option.key;
          OptionScoresRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}/scores`);
          OptionScoresRef.child(newFactorId).set({factor, weight: 5, isScored: false, score: 0});
        });
      }).then(() => {
        // recalculate perfectScore
        const factorsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors/`).orderByKey();
        var perfectScore = 0;
        factorsRef.once("value").then(function(snapshot) {
          snapshot.forEach(function(factor) {
            perfectScore += factor.child("weight").val();
          });

          const DecisionRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}`);
          DecisionRef.update({perfectScore: perfectScore*2});
        });
      });
      dispatch({type: FACTOR_CREATE});
      Actions.pop();
    });
  }

  // if (total >= 5) {
  //   return (dispatch) => {
  //     firebase.database().ref(`/users/${currentUser.uid}/payment/options/paid`).on('value', snapshot => {
  //       console.log(snapshot.val());
  //       let val = snapshot.val();
  //       if (val !== true) {
  //         dispatch({
  //           type: PAY_OPTION,
  //           payload: 'factors'
  //         })
  //         Actions.PaymentRoute();
  //         stopLoading(dispatch);
  //       } else {
  //         addFactor(dispatch);
  //       }
  //     });
  //   }
  // } else {
    return (dispatch) => {
      addFactor(dispatch);
    }
  // }
};

const stopLoading = (dispatch) => {
  dispatch({
    type: STOP_FACTOR_LOADING
  });
};

export const factorEdit = ({factor, factorId, decisionId}) => {
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  return (dispatch) => {
    const OptionsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`).orderByKey();
    OptionsRef.once("value").then(function(snapshot) {
      snapshot.forEach(function(option) {
        var optionId = option.key;
        OptionScoresRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}/scores`);
        OptionScoresRef.child(factorId).update({factor});
      });

    });
    firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors/${factorId}`).update({factor}).then(() => {
      dispatch({type: FACTOR_SAVE_SUCCESS});
      Actions.pop();
      stopLoading(dispatch);
    });
  }
  return;
};

export const factorDelete = ({decisionId, factorId}) => {
  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase
  return (dispatch) => {
    const OptionsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`).orderByKey();
    OptionsRef.once("value").then(function(snapshot) {
      snapshot.forEach(function(option) {
        var optionId = option.key;

        const delFactorsScore = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}/scores/${factorId}`)
        delFactorsScore.once("value").then((snapshot) => {
          let score = snapshot.val().score;
          let optionScoresRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}`);
          optionScoresRef.once("value").then((snapshot) => {
            let optionScore = snapshot.val().optionScore;
            optionScore = optionScore - score;
            optionScoresRef.update({optionScore});

            OptionScoresRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}/scores`);
            OptionScoresRef.child(factorId).remove();
          })
        })

      });

    });

    let delFactorsWeight;
    const delFactors = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors/${factorId}`);
    delFactors.once("value").then(function(snapshot) {
      delFactorsWeight = snapshot.val().weight;
      console.log('Weight: ', delFactorsWeight);

      firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors/${factorId}`).remove()
      .then(() => {
        // recalculate perfectScore
        const factorsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors/`).orderByKey();
        var perfectScore = 0;
        factorsRef.once("value").then(function(snapshot) {
          snapshot.forEach(function(factor) {
            perfectScore += factor.child("weight").val();
          });

          const DecisionRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}`);
          DecisionRef.update({perfectScore: perfectScore*2})
          .then(() => {
            //Update optionScore and optionScorePercentage
            const OptionsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`).orderByKey();
            OptionsRef.once("value").then(function(snapshot) {
              snapshot.forEach(function(option) {
                var optionId = option.key;
                OptionScoresRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}/`);
                console.log(option.val().optionScore, perfectScore * 2);
                var optionScorePercentage = perfectScore > 0 ? Math.ceil((option.val().optionScore/(perfectScore * 2)) * 100) : 0;
                OptionScoresRef.update({optionScorePercentage});
                console.log('Put in:', optionScorePercentage);
              });
            });
          });
        });
      })
    })
    .then(() => {
      stopLoading(dispatch);
      Actions.pop();
    });

  }
  return;
};

export const factorsFetch = (decisionId) => {

  const {currentUser} = firebase.auth(); // deconstructing out of firebase.auth...
  //update firebase

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors`).on('value', snapshot => {
      dispatch({type: FACTORS_FETCH_SUCCESS, payload: snapshot.val()});
    });
  }
};

export const weightFactor = (dataz) => {
  const {currentUser} = firebase.auth();
  const {decisionId} = dataz[0];
  let alreadyScoredVal = {};

  return (dispatch) => {
    var parentRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`);

    parentRef.once("value").then(function(snapzhot) {

      const OptionsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options`).orderByKey();
      OptionsRef.once("value").then(function(snapshot) {

        let parentTop = snapzhot.val();
        console.log('IS IT: ', parentTop);

        let scorePos = 0;

        for (var i = 0; i < dataz.length; i++) {
          const {factorId, weight} = dataz[i];

          snapshot.forEach(function(option) {
            var optionId = option.key;

            var OptionScoresRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}/scores`);
            var scoredFactorRef = OptionScoresRef.child(factorId);

            // recalculate scores
            var newScore = 0;

            scoredFactorRef.once("value").then(function(snapshot) {
              var oldWeight = snapshot.child("weight").val();
              var score = snapshot.child("score").val();
              
              if (!alreadyScoredVal[factorId]) {
                alreadyScoredVal[factorId] = {};
              }

              if (score) {
                newScore = (score/oldWeight) * weight; //(score/oldWeight) * weight
                console.log('wrong:', score, weight, (score/oldWeight) * weight);
                console.log('factor id: ', factorId, optionId);
                parentTop[optionId].scores[factorId].score = newScore;
                alreadyScoredVal[factorId][optionId] = newScore;
                console.log('worked?', JSON.stringify(alreadyScoredVal));
                updateWeight();
                //scoredFactorRef.update({score: newScore}).then(() => updateWeight());
              } else {
                parentTop[optionId].scores[factorId].score = 0;
                alreadyScoredVal[factorId][optionId] = 0;
                updateWeight();
                //scoredFactorRef.update({score: 0}).then(() => updateWeight());
              }

              function updateWeight() {
                // updated weight
                parentTop[optionId].scores[factorId].weight = weight;
                scorePos += 1;
                if (scorePos === dataz.length) {
                  updateOptionScore();
                }
              }
            });

          });

        }

        //update total option score
        function updateOptionScore() {
          let optionTotal = Object.keys(snapshot.val()).length;
          let optionPos = 0;
          snapshot.forEach(function(option) {
            var optionId = option.key;
            // get reference to option
            var OptionRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/options/${optionId}`);
            // iterate scores in this option and tally
            var optionScore = 0;
            OptionRef.once("value").then(function(option) {
              console.log("option:");
              console.log(option.val());
              //iterate scores and add up
              option.child('scores').forEach(function(score) {
                let eachScore;
                let neededFactorId = score.key;
                console.log('should:', neededFactorId, alreadyScoredVal, optionId);
                if (alreadyScoredVal.hasOwnProperty(neededFactorId)) {
                  //It has a new score
                  eachScore = alreadyScoredVal[neededFactorId][optionId];
                } else {
                  eachScore = score.child("score").val();
                }
                console.log('yere: ' + eachScore);
                optionScore += eachScore;
              });
              console.log('chai:', optionScore);
              parentTop[optionId].optionScore = optionScore;
              optionPos += 1;
              if (optionPos === optionTotal) {
                firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}`).update({options: parentTop})
                .then(() => {
                  updatePerfectScore();
                })
              }
              //OptionRef.update({optionScore: optionScore}).then(() => updatePerfectScore());
            });
          });
        }
      });


      function updatePerfectScore() {
        const subParentTop = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors`);
        subParentTop.once("value").then(function(snapzhot) {
          let subParent = snapzhot.val();
          console.log('IZ IT: ', subParent);
          updateFactorWeight(subParent, 0);
        })

        function updateFactorWeight(subParent, i) {
          const factorId2 = dataz[i].factorId;
          const weight2 = dataz[i].weight;
          subParent[factorId2].weight = weight2;
          if (i === dataz.length - 1) {
            firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}`).update({factors: subParent})
            .then(() => {
              fin();
            })
          } else {
            updateFactorWeight(subParent, i + 1);
          }
          //firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors/${factorId2}`).update({weight2})
        }

        function fin() {
          //update the decison's perfect score
          const decisionRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}`);
          const factorsRef = firebase.database().ref(`/users/${currentUser.uid}/decisions/${decisionId}/factors/`).orderByKey();
          var perfectScore = 0;
          factorsRef.once("value").then(function(snapshot) {
            snapshot.forEach(function(factor) {
              perfectScore += factor.child("weight").val();
            });
            decisionRef.update({perfectScore: perfectScore*2})
            .then(() => {
              Actions.ScoreOptionsListRoute();
              dispatch({
                type: RES_FACTOR_SAVING,
                payload: false
              });
            })
          });
        };

      }

    })
  }
  return;
};

export const factorFormStateReset = () => {
  return {type: FACTOR_FORM_STATE_RESET};
}

export const factorsStateReset = () => {
  return {type: FACTORS_STATE_RESET};
}
