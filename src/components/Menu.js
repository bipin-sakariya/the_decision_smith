import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase/compat';
import { Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import socialColors from '../config/socialColors.js';
// import * as RNIap from 'react-native-iap';
import { Actions } from 'react-native-router-flux';
import { emailChanged } from '../actions';
import { Spinner } from './common';
import Network from './Network';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const itemSkus = Platform.select({
//   ios: [
//     'com.test.test'
//   ],
//   android: [
//     'com.test.test'
//   ]
// });

class Menu extends Component {
  async componentWillMount() {
    try {
      // await RNIap.prepare();
      // const products = await RNIap.getProducts(itemSkus);
      // console.log(products);
    } catch (err) {
      console.log(err);
    }
  }

  onSignOutButtonPress() {
    firebase.auth().signOut()
      .then(function () {
        AsyncStorage.removeItem('User')
        Actions.popTo('InitialViewRoute');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onDeleteButtonPress() {
    Alert.alert('Alert', 'Are you sure you want to delete your account?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            const user = firebase.auth().currentUser;
            user.delete().then(() => {
              // User deleted.
              Alert.alert('Success', 'Your account is deleted successfully.',[
                {
                  text: "OK", onPress: () => {
                    AsyncStorage.removeItem('User')
                    Actions.popTo('InitialViewRoute');
                  }
                }
              ])
            }).catch((error) => {
              // An error ocurred
              // ...
            });
          } 
        }
      ])
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
        <Network />
        <View>
          <Button title='TUTORIAL' onPress={() => Actions.Instructions()} large backgroundColor={socialColors.smithPurple}
            buttonStyle={{
              marginTop: 10
            }}
          />
          <Button title="PP / T & C\'s" onPress={() => Actions.Legal()} large backgroundColor={socialColors.smithGreen}
            buttonStyle={{
              marginTop: 10
            }}
          />
          <Button title='DELETE ACCOUNT' onPress={this.onDeleteButtonPress.bind(this)} large backgroundColor={socialColors.youtube}
            buttonStyle={{
              marginTop: 10
            }}
          />
          <Button title='SIGN OUT' onPress={this.onSignOutButtonPress.bind(this)} large backgroundColor={socialColors.youtube}
            buttonStyle={{
              marginTop: 10
            }}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headingText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: socialColors.smithBlue,
    fontWeight: 'bold'
  }
})


export default connect(null, { emailChanged })(Menu);
