import React, { Component } from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase";
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';

class InitialView extends Component {
  componentWillMount() {
    //Check if user is logged in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('User is signed in', user);
        Actions.main();
      } else {
        console.log('No user is signed in');
      }
    });
  }

  onSignInButtonPress() {
    Actions.LoginRoute();

  }
  onSignUpButtonPress() {
    Actions.SignUpFormRoute();

  }
  renderButtons() {
    if (this.props.loading) {
      return (<Spinner size="large" />)
    } else {
      return (
        <View>
          <Button title='SIGN IN' onPress={this.onSignInButtonPress.bind(this)} large backgroundColor={socialColors.smithGreen} />
          <Text style={styles.signingText}>Signing in will enable you to save and access your decisions in the future</Text>
          <Text style={styles.questionText}>Don't have an account? </Text>
          <Button title='SIGN UP' onPress={this.onSignUpButtonPress.bind(this)} large backgroundColor={socialColors.smithPurple} />
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView style={{
        backgroundColor: '#FFFFFF'
      }} keyboardShouldPersistTaps="always">
        <View style={styles.contentContainer}>
          <View>
            <Image source={require('../assets/logo.jpg')} style={{
              flex: 1,
              height: 150,
              width: 350,
              justifyContent: 'center'
            }} />
            <Text style={styles.tagLine}>HELPING YOU MAKE DIFFICULT DECISIONS WITH CONFIDENCE</Text>
            <Text style={styles.introductionText}>The Decision Smith - an interactive tool to help you evaluate difficult decisions.</Text>
          </View>
          <View>
            {this.renderButtons()}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}
            onPress={() => Actions.LegalInit()}
          >
            By signing up to The Decision Smith, you agree to the privacy policy and terms of service.
          </Text>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    height: 100
  },
  tagLine: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: socialColors.smithBlue,
    fontWeight: 'bold'

  },
  introductionText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 16,
    color: socialColors.smithPurple
  },
  signingText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 12,
    color: colors.smithGrey
  },
  questionText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 16,
    color: colors.smithGrey
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 'auto',
    marginRight: 5,
    marginLeft: 5,
    fontSize: 12,
    color: colors.smithGrey,
    textDecorationLine: 'underline'
  }
})

export default InitialView;
