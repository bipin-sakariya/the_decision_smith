import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {decisionUpdate} from '../actions';
import {Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';

class DecisionForm extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(this.props.decision === nextProps.decision) {
  //     return false;
  //   }
  //   return true;
  // }

  render(){
    console.log(this.props);
    const {decision} = this.props;

    return(
     <ScrollView style={{backgroundColor: 'white'}} keyboardShouldPersistTaps="always">
          <FormLabel>Decision</FormLabel>
          <FormInput placeholder="Decision you have to make..." onChangeText={value => this.props.decisionUpdate({prop: 'decision', value: value})} value={decision}/>
    </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
    console.log(state);
    const {decision, last_updated} = state.decisionForm;
    return {decision, last_updated};

};
export default connect(mapStateToProps, {decisionUpdate})(DecisionForm);
