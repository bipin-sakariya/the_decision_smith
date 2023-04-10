import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Image, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {optionCreate, optionStateReset, optionUpdate} from '../actions';
import {Button, Text, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import OptionForm from './OptionForm';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import Network from './Network';

class OptionCreate extends Component {

  componentWillMount() {
    this.props.optionStateReset();
  }

  onSaveButtonPress() {
    const {options, option, decisionId} = this.props;
    console.log(options);
    let total;
    if (options === null || options === undefined) {
      total = 0;
    } else {
      total = Object.keys(options).length;
    }

    if (option) {
      if (option.trim().length === 0) {
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
      this.props.optionUpdate({prop: 'loading', value: true});
      this.props.optionCreate({option, decisionId, total});
    }
  }

  onCancelButtonPress() {
    Actions.pop();
  }

  renderButtons() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" color="#00ff00" />
    } else {
      return (
        <View>
          <Button title='Save' onPress={this.onSaveButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle}/>
          <Button title='Cancel' onPress={this.onCancelButtonPress.bind(this)} backgroundColor={colors.smithGrey} style={styles.buttonStyle}/>
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Network />
        <View>
          <Image source={require('../assets/logo.jpg')} style={{
            flex: 1,
            height: 150,
            width: 350,
            justifyContent: 'center'
          }}/>
        <Text style={styles.headingText}>ADD AN OPTION</Text>
        <Text style={styles.instructionText}>List the Options you currently have to choose from</Text>
        </View>
        <OptionForm {...this.props}/>
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
  const {option, loading} = state.optionForm;
  const decisionId = state.decisionId;
  const options = state.options;
  return {option, decisionId, options, loading};

};

export default connect(mapStateToProps, {optionCreate, optionStateReset, optionUpdate})(OptionCreate);
