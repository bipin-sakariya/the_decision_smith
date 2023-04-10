import _ from 'lodash';
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import ListView from "deprecated-react-native-listview";
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { decisionsFetch, decisionStateReset, factorsStateReset, optionsStateReset, selectedDecisionStateReset, decisionUpdate } from '../actions';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Network from './Network';

class DecisionsList extends Component {

  componentWillMount() {
    this.props.decisionStateReset();
    this.props.selectedDecisionStateReset();
    this.props.optionsStateReset();
    this.props.factorsStateReset();
    this.props.decisionsFetch();
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component will be rendered with
    //this.props is the old set of props
    this.createDataSource(nextProps);
  }

  createDataSource({ decisions }) {
    console.log(decisions, decisions.length);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.dataSource = ds.cloneWithRows(decisions);
  }

  renderRow(decision) {
    console.log(decision, this.props);
    return (<ListItem key={decision.uid} title={decision.decision} subtitle={decision.last_updated} onPress={() => {
      this.props.decisionUpdate({ prop: 'decision', value: decision.decision });
      Actions.DecisionEditRoute({ decision: decision })
    }} />)
  }

  renderList() {
    console.log(this.props);
    if (this.props.decisions.length === 0) {
      return (
        <Button
          title="Instructions for first time users"
          backgroundColor={socialColors.smithPrimary}
          textStyle={{
            paddingVertical: 2.5,
            paddingHorizontal: 15
          }}
          buttonStyle={{
            // width: 300,
            // height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10,
            alignSelf: "center"
          }}
          containerStyle={{ marginTop: 30 }}
          onPress={() => Actions.Instructions()}
        />
      )
    } else {
      return (
        <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections />
      )
    }
  }

  render() {
    return (
      <ScrollView style={{
        backgroundColor: 'white'
      }} keyboardShouldPersistTaps="always">
        <Network />
        <Image source={require('../assets/logo.jpg')} style={{
          flex: 1,
          height: 150,
          width: 350,
          justifyContent: 'center'
        }} />
        <Text style={styles.headingText}>YOUR DECISIONS</Text>
        <Text style={styles.instructionText}>Click on the + sign in the top right corner to add a new decision or select from the decisions below</Text>
        <View style={{
          backgroundColor: 'white'
        }} keyboardShouldPersistTaps="always">
          {this.renderList()}
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
  }
})
const mapStateToProps = state => {

  const decisions = _.map(state.decisions, (val, uid) => {

    return {
      decision: val.decision,
      last_updated: moment(val.last_updated).calendar(),
      uid
    };
  });

  return { decisions };

};

export default connect(mapStateToProps, { decisionsFetch, decisionStateReset, factorsStateReset, optionsStateReset, selectedDecisionStateReset, decisionUpdate })(DecisionsList);
