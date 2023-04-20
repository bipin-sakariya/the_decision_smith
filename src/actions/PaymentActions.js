import firebase from 'firebase/compat';
import { Alert, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import * as RNIap from 'react-native-iap';

export const pay = (kind) => {
  let sku;
  if (kind === 'options') {
    sku = Platform.OS === 'ios' ? 'com.tds.tdz' : 'com.tds.tds';
    console.log('SKUU: ', sku);
  }

  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // RNIap.buyProduct(sku).then(purchase => {
    //   RNIap.endConnection();
    firebase.database().ref(`/users/${currentUser.uid}/payment/${kind}`).update({ paid: true, receipt: purchase.transactionReceipt }).then(() => {
      Actions.pop();
    });
    //   }).catch(err => {
    //     console.warn(err); // standardized err.code and err.message available
    //     Alert.alert(
    //       'Error',
    //       err.message,
    //       [
    //         {text: 'OK', onPress: () => console.log('OK Pressed')}
    //       ],
    //       { cancelable: false }
    //     );
    //   })
  };
};
