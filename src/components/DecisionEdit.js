import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Modal, Image, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {decisionUpdate, decisionEdit, decisionDelete, registerDecisionId, getDecision} from '../actions';
import Communications from 'react-native-communications';
import {Card, CardSection, Confirm} from './common';
import {Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import DecisionForm from './DecisionForm';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import Reactotron from 'reactotron-react-native';
import Network from './Network';

class DecisionEdit extends Component {

  // component level state
  state = {
    showModal: false
  };

  onDecline = () => {
    this.setState({showModal: false});
  }

  onAccept = () => {
    const {uid} = this.props.navigation.state.params.decision;
    this.props.decisionDelete({uid});
  }

  componentWillMount() {
    let navObj = this.props.navigation.state.params;

    // console.log("DecisonEdit: componentWillMount", navObj);
    _.each(Actions.state.decision, (value, prop) => {
      this.props.decisionUpdate({prop, value});
    });

    if(navObj.decision.uid) {
      this.props.registerDecisionId({decisionId: navObj.decision.uid});
      this.props.getDecision({decisionId: navObj.decision.uid});
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const {decision, loading} = this.props;
  //   const {uid} = this.props.navigation.state.params.decision;
  //   const otherDecision = this.props.navigation.state.params.decision.decision;
  //
  //   if(decision === nextProps.decision && loading === nextProps.loading &&
  //     uid === nextProps.navigation.state.params.decision &&
  //     otherDecision === nextProps.navigation.state.params.decision.decision &&
  //     this.state.showModal === nextState.showModal
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  componentWillReceiveProps(nextProps) {
    // let navObj = Actions.state.routes[1].routes[1].params; 
    let navObj = this.props.navigation.state.params
    Reactotron.log("nextProps");
    Reactotron.log(nextProps);
    if(navObj.decision.uid) {
      this.props.getDecision({decisionId: navObj.decision.uid});
    }
  }

  onButtonPress() {
    console.log(this.props);
    const {uid} = this.props.navigation.state.params.decision;
    const {decision} = this.props;
    this.props.decisionEdit({uid, decision, last_updated: moment().toISOString()});
  }

  goToResults() {
    Actions.ResultsRoute();
  }

  onHomeButtonPress() {
    Actions.popTo('DecisionListRoute');
  }

  onDeleteButtonPress() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  renderButtons() {
    if (this.props.loading) {
      return  <ActivityIndicator size="large" color="#00ff00" />
    } else {
      return (
        <View>
          <Button title='2. LIST OPTIONS' onPress={this.onButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} rightIcon={{
            name: 'chevron-right'
          }}/>
          <Button title='Delete Decision' onPress={this.onDeleteButtonPress.bind(this)} backgroundColor={colors.smithGrey} style={styles.buttonStyle}/>
          <Button title='GO TO RESULTS' onPress={this.goToResults.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} rightIcon={{
            name: 'chevron-right'
          }}/>
          <Button title='HOME' onPress={this.onHomeButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle} icon={{
            name: 'home'
          }}/>
        </View>
      )
    }
  }

  render() {
    console.log(this.props);

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
        <Text style={styles.headingText}>ENTER A DECISION</Text>
        </View>
        <DecisionForm
          {...this.props}
          decisionEdit={this.props.navigation.state.params.decision.decision}
        />
        {this.renderButtons()}
        <Confirm visible={this.state.showModal} onDecline={this.onDecline.bind(this)} onAccept={this.onAccept.bind(this)}>
          Are you sure you want to delete this decision?
        </Confirm>
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

const mapStateToProps = (state) => {
  console.log("decisionEdit: mapStateToProps");
  console.log(state.decisionForm);
  const {uid, decision, last_updated, loading} = state.decisionForm;
  return {uid, decision, last_updated, loading};

};

export default connect(mapStateToProps, {decisionUpdate, decisionEdit, decisionDelete, registerDecisionId, getDecision})(DecisionEdit);
