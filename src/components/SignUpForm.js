import React, {Component} from 'react';
import {ScrollView, Text, View, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, registerUser, signupForm, firstNameChanged, lastNameChanged, voucherCodeChanged } from '../actions';
import {Spinner} from './common';
import {Actions} from 'react-native-router-flux';
import {Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Network from './Network';

class SignUpForm extends Component {

  onFirstNameChanged(text) {
    this.props.firstNameChanged(text); // fire an action to update the field
  }
  onLastNameChanged(text) {
    this.props.lastNameChanged(text); // fire an action to update the field
  }

  onEmailChanged(text) {
    this.props.emailChanged(text); // fire an action located in ..actions/index.js

  }
  onPasswordChanged(text) {
    this.props.passwordChanged(text); // fire an action
  }

  onVoucherCodeChanged(text) {
    this.props.voucherCodeChanged(text); // fire an action
  }

  onRegisterButtonPress() {
    const {firstName, lastName, email, password, voucherCode} = this.props;
    //this.props.loginUser({email, password});
    this.props.registerUser({firstName, lastName, email, password, voucherCode}); // execute registration action (in AuthActions)
  }

  renderRegisterButton() {
    if (this.props.loading) {
      return (<Spinner size="large"/>)
    } else {
      return (<Button title='REGISTER' onPress={this.onRegisterButtonPress.bind(this)} large backgroundColor={socialColors.smithGreen}/>)
    }
  }

  render() {
    return (
      <ScrollView style={{
        backgroundColor: 'white'
      }} keyboardShouldPersistTaps="always">
      <Network />
      <View>
        <Image source={require('../assets/logo.jpg')} style={{
          flex: 1,
          height: 120,
          width: 350,
          justifyContent: 'center'
        }}/></View>
        <View>
          <Text style={styles.headingText}>CREATE AN ACCOUNT</Text>
          <FormLabel>First Name</FormLabel>
          <FormInput label="First Name" placeholder="John" onChangeText={this.onFirstNameChanged.bind(this)} value={this.props.firstName}/>
          <FormLabel>Last Name</FormLabel>
          <FormInput label="Last Name" placeholder="Smith" onChangeText={this.onLastNameChanged.bind(this)} value={this.props.lastName}/>

          <FormLabel>Email</FormLabel>
          <FormInput label="Email" placeholder="email@gmail.com" onChangeText={this.onEmailChanged.bind(this)} value={this.props.email}/>
          <FormLabel>Password</FormLabel>
          <FormInput label="Password" secureTextEntry placeholder="password" onChangeText={this.onPasswordChanged.bind(this)} value={this.props.password}/>
        </View>
        <FormValidationMessage>{this.props.error}</FormValidationMessage>
        <View>
          {this.renderRegisterButton()}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}
            onPress={() => Actions.LegalInit()}
          >
            By signing up to The Decision Smith, you agree to the privacy policy and terms of service
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
  headingText: {
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

const mapStateToProps = ({auth}) => {
  const { email, password, error, loading, firstName, lastName, voucherCode } = auth;
  return {
    email,
    password,
    error,
    loading,
    firstName,
    lastName,
    voucherCode
  }
};

/* import actions from ../actions/index.js -> then pass actions (functions) into form */
export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  firstNameChanged,
  lastNameChanged,
  registerUser,
  signupForm,
  voucherCodeChanged
})(SignUpForm);

//connect takes mapStateToProps function and mapActionsToProps function
