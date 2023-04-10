import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View, StyleSheet, Image, ActivityIndicator, Alert} from 'react-native';
import {decisionUpdate, decisionCreate, decisionStateReset} from '../actions';
import {Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import DecisionForm from './DecisionForm';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import moment from 'moment';
import Network from './Network';

class DecisionCreate extends Component {

    componentWillMount() {
      this.props.decisionStateReset();
    }

    componentWillReceiveProps(props) {
      console.log(props);
    }

    onButtonPress() {
      const {decision} = this.props;
      console.log(decision);
      if (decision) {
        if (decision.trim().length === 0) {
          Alert.alert(
            'Error',
            'Please fill out form',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ],
            { cancelable: false }
          )
          return;
        }
        this.props.decisionUpdate({prop: 'loading', value: true})
        this.props.decisionCreate({
          decision,
          last_updated: moment().toISOString()
        });
      }
    }

    onCancelButtonPress() {
      this.props.decisionStateReset();
      Actions.pop();
    }

    renderButtons() {
      console.log(this.props.loading);
      if (this.props.loading) {
        return <ActivityIndicator size="large" color="#00ff00" />
      } else {
        return (
          <View>
            <Button title='2. LIST OPTIONS' onPress={this.onButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} rightIcon={{
              name: 'chevron-right'
            }}/>
            <Button title='Cancel' onPress={this.onCancelButtonPress.bind(this)} backgroundColor={colors.smithGrey} style={styles.buttonStyle}/>
          </View>
        )
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
            <Text style={styles.headingText}>STEP 1: IDENTIFY YOUR DECISION</Text>
            <Text style={styles.instructionText}>Type in a few words to describe the DECISION you are faced with. Once completed move to Step 2 to LIST YOUR OPTIONS</Text>
            </View>
            <DecisionForm {...this.props}/>
            <Text style={styles.helperText}>(e.g. What house should I buy? Should I take a new job? Do I marry him? Where should I go for vacation?)</Text>
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

const mapStateToProps = (state) => {
    const {decision, last_updated, loading} = state.decisionForm;
    return {decision, loading};
};

export default connect(mapStateToProps, {decisionCreate, decisionStateReset, decisionUpdate})(DecisionCreate);
