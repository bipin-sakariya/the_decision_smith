import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signupForm } from '../actions';
import { Spinner } from './common';
import { Actions } from 'react-native-router-flux';
import { Button, FormInput, FormLabel, FormValidationMessage, CheckBox } from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Network from './Network';

class LoginForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        staySignedIn: false,
      }
    }

    onEmailChanged(text) {
      this.props.emailChanged(text); // fire an action to update the field
    }

    onPasswordChanged(text) {
      this.props.passwordChanged(text); // fire an action
    }
    onLoginButtonPress() {
      const {email, password} = this.props;
      this.props.loginUser({email, password}, this.state.staySignedIn);
    }
    onSignUpButtonPress() {
        this.props.signupForm();
        //Actions.SignUpFormRoute();
    }
    onForgotPasswordButtonPress() {
      Actions.ForgotPasswordRoute();
    }

    renderLoginButton() {
        if (this.props.loading) {
            return (<Spinner size="large"/>)
        } else {
            return (
              <View>
                  <Button title='SIGN IN' onPress={this.onLoginButtonPress.bind(this)} large backgroundColor={socialColors.smithGreen} style={styles.buttonStyle}/>

                  <Button title='FORGOT MY PASSWORD' onPress={this.onForgotPasswordButtonPress.bind(this)} large backgroundColor={socialColors.smithBlue} style={styles.buttonStyle}/>

               </View>
             )
        }
    }
    renderSignUpButton() {

        return (<Button title='Sign Up' onPress={this.onSignUpButtonPress.bind(this)}/>)
    }
    renderForgotPasswordButton() {
        return (<Button title='Forgot' onPress={this.onForgotPasswordButtonPress.bind(this)}/>)
    }

    render() {
      const { staySignedIn } = this.state;
        return (
           <ScrollView style={{backgroundColor: 'white'}} keyboardShouldPersistTaps="always">
             <Network />
             <View>
               <Image source={require('../assets/logo.jpg')} style={{
                 flex: 1,
                 height: 150,
                 width: 350,
                 justifyContent: 'center'
               }}/>
             </View>
               <Text style={styles.headingText}>SIGN IN</Text>
                <View>
                    <FormLabel>Email</FormLabel>
                    <FormInput label="Email" keyboardType='email-address' placeholder="email@gmail.com" onChangeText={this.onEmailChanged.bind(this)} value={this.props.email}/>
                    <FormLabel>Password</FormLabel>
                    <FormInput
                      label="Password"
                      secureTextEntry
                      placeholder="password"
                      onChangeText={this.onPasswordChanged.bind(this)}
                      value={this.props.password}
                      returnKeyType='done'
                      onSubmitEditing={() => {
                        if (!this.props.loading) {
                          this.onLoginButtonPress();
                        }
                      }}
                    />
                </View>
                <FormValidationMessage>{this.props.error}</FormValidationMessage>
                <View>
                    <CheckBox
                        title='Stay signed in'
                        checked={staySignedIn}
                        onPress={() => this.setState({staySignedIn: !staySignedIn})}
                    />
                </View>
                <View>
                    {this.renderLoginButton()}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingTop: 10
  },
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
  bodyText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
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
    color: colors.smithGrey
  },
  spacer20: {
    marginTop:10,
    marginBottom:10
  }
})

const mapStateToProps = ({auth}) => {
    const {email, password, error, loading} = auth;
    return {email, password, error, loading}
};
export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser, signupForm})(LoginForm);

//connect takes mapStateToProps function and mapActionsToProps function
