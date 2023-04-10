import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { factorCreate, factorFormStateReset, factorUpdate } from '../actions';
import { Button, Text, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import FactorForm from './FactorForm';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import Network from './Network';

class FactorCreate extends Component {

  componentWillMount() {
    this.props.factorFormStateReset();
  }

  onSaveButtonPress() {
    const { factor, decisionId, factors } = this.props;
    console.log(factors);
    let total;
    if (factors === null || factors === undefined) {
      total = 0;
    } else {
      total = Object.keys(factors).length;
    }

    if (factor) {
      if (factor.trim().length === 0) {
        Alert.alert(
          'Error',
          'Please fill out form',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        )
        return;
      }
      this.props.factorUpdate({ prop: 'loading', value: true });
      this.props.factorCreate({
        factor,
        decisionId,
        total
      });
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
          <Button title='Save' onPress={this.onSaveButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} />
          <Button title='Cancel' onPress={this.onCancelButtonPress.bind(this)} backgroundColor={colors.smithGrey} style={styles.buttonStyle} />
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
            justifyContent: 'center',
          }} />
          <Text style={styles.headingText}>ADD A FACTOR</Text>
          <Text style={styles.instructionText}>DEFINE all of the FACTORS that you are taking into consideration. EXAMPLE: Buying a house.
            Your factors could be: location, cost, number of bedrooms, size of backyard, finished basement.
          </Text>

        </View>
        <FactorForm {...this.props} />
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
  const factors = _.map(state.factors, (val, uid) => {
    return { factor: val.factor, uid };
  });

  const { factor, loading } = state.factorForm;
  const decisionId = state.decisionId;
  return { factor, decisionId, loading, factors };
};

export default connect(mapStateToProps, { factorCreate, factorFormStateReset, factorUpdate })(FactorCreate);
