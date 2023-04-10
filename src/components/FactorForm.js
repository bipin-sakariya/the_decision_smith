import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {factorUpdate} from '../actions';
import {Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';

class FactorForm extends Component {

  render(){
    return(
     <ScrollView style={{backgroundColor: 'white'}} keyboardShouldPersistTaps="always">
          <FormLabel>Factor</FormLabel>
          <FormInput placeholder="Enter Factor..." onChangeText={value => this.props.factorUpdate({prop: 'factor', value: value})} value={this.props.factor}/>
          <Text style={styles.helperText}>The order you LIST the FACTORS is not important. Take time to make sure your LIST is complete.</Text>
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
    const {factor} = state.factorForm;
    return {factor};
};
export default connect(mapStateToProps, {factorUpdate})(FactorForm);
