import React, { Component } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase/compat";
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

class InitialView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  UNSAFE_componentWillMount() {
    // var that = this;
    //Check if user is logged in
    // setTimeout(() => {
    // firebase.auth().onAuthStateChanged(function (user) {
    //   console.log({ user });
    //   if (user) {
    //     that.setState({ loading: false })
    //     console.log('User is signed in', user);
    //     Actions.main();
    //   } else {
    //     that.setState({ loading: false })
    //     console.log('No user is signed in');
    //   }
    // });
    // }, 5000)
    this.getUser()
  }

  async getUser() {
    const getUser = await AsyncStorage.getItem('User')
    const user = JSON.parse(getUser)
    console.log({ user })
    if (user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(async (user) => {
          if (user) {
            Actions.main();
            this.setState({ loading: false });
          }
        })
        .catch((error) => { console.log({ error }); });
    } else {
      this.setState({ loading: false })
    }
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
            {this.state.loading ?
              <ActivityIndicator /> :
              this.renderButtons()
            }
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
