import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {resetPassword} from '../actions';
import {Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import moment from 'moment';
import Network from './Network';

class ForgotPassword extends Component {
    constructor(props) {
      super(props);

      this.state = {
        value: ''
      }
    }

    componentWillMount() {

    }

    onButtonPress() {
      this.setState({loading: true})
      this.props.resetPassword(this.state.value);
    }

    onCancelButtonPress() {
      this.props.decisionStateReset();
      Actions.pop();
    }

    renderButtons() {
      if (this.props.loading) {
        return <ActivityIndicator size="large" color="#00ff00" />
      } else {
        return <Button title='Reset' onPress={this.onButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle}/>
      }
    }

    render() {
        return (
          <ScrollView>
            <Network />
            <View>
              <Image source={require('../assets/logo.jpg')} style={{
                flex: 1,
                height: 150,
                width: 350,
                justifyContent: 'center'
              }}/>
            <Text style={styles.headingText}>RESET PASSWORD</Text>
            </View>
            <ScrollView style={{backgroundColor: 'white'}} keyboardShouldPersistTaps="always">
              <FormLabel>Email</FormLabel>
              <FormInput placeholder="Enter email" onChangeText={value => this.setState({value: value})} value={this.state.value}/>
            </ScrollView>
            {this.renderButtons()}
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
  instructionText: {
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
  helperText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 14,
    color: socialColors.smithBlue
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
    marginTop: 10,
    marginBottom: 10
  }
})

const mapStateToProps = state => {
  const {loading} = state.auth;
  return {loading}
}

export default connect(mapStateToProps, {resetPassword})(ForgotPassword);
