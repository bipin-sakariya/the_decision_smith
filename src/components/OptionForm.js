import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { optionUpdate } from '../actions';
import { Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';

class OptionForm extends Component {

  render() {
    console.log(this.props);
    let option;
    // if (this.props.option !== "") {
    //   option = this.props.option;
    // } else
    option = this.props.option;
    // if (this.props.optionEdit) {
    //   option = this.props.optionEdit;
    // } else {
    //   option = this.props.option;
    // }

    return (
      <ScrollView style={{ backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
        <FormLabel>Option</FormLabel>
        <FormInput placeholder="Enter Option..." onChangeText={value => this.props.optionUpdate({ prop: 'option', value: value })} value={option} />
        <Text style={styles.helperText}>EXAMPLE: Buying a house. When you've narrowed down the properties you are interested in, list each address as an OPTION. Staying at your current address can be an OPTION</Text>
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
  helperText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 14,
    color: socialColors.smithBlue
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
  const { option } = state.optionForm;
  return { option };

};
export default connect(mapStateToProps, { optionUpdate })(OptionForm);
