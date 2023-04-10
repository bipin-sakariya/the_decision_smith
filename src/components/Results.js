import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Image} from 'react-native';
import ListView from "deprecated-react-native-listview";
import {Button, List, ListItem, Text} from 'react-native-elements';
import ScoreResult from './ScoreResult';
import {connect} from 'react-redux';
import {getDecision} from '../actions';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';

class Results extends Component {
  componentWillMount() {
    this.props.getDecision({decisionId: this.props.decisionId});
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({scoreOptions}) {
    console.log(scoreOptions);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.dataSource = ds.cloneWithRows(scoreOptions);
  }

  renderRow(scoreOption) {
    console.log(scoreOption);
    return (<ScoreResult option={scoreOption.option} score={scoreOption.optionScore} percent={scoreOption.optionScorePercentage}/>)
  }

  onHomeButtonPress() {
    Actions.popTo('DecisionListRoute');
  }

  render() {
    const decision = this.props.selectedDecision.decision;
    const perfectScore = this.props.selectedDecision.perfectScore;
    console.log(this.props.selectedDecision);

    return (
      <ScrollView style={{
        backgroundColor: 'white'
      }} keyboardShouldPersistTaps="always">
        <Image source={require('../assets/logo.jpg')} style={{
          flex: 1,
          height: 150,
          width: 350,
          justifyContent: 'center'
        }}/>
        <Text style={styles.headingText}>YOUR RESULTS</Text>
        <Text style={styles.introductionText}>
          Here are the calculations for your OPTIONS. The % shows you which OPTION is the most favorable based
          on your input. If all of your SCORES are low, considering other OPTIONS where possible is suggested.
        </Text>
        <Text style={styles.decisionText}>{decision}</Text>
        <ScoreResult isPerfect option="Target Score" score={perfectScore} percent={100}/>
        <View>
          <ListView dataSource={this.dataSource} renderRow={this.renderRow} enableEmptySections/>
        </View>
        <Text style={styles.resultText}>{this.props.bestResult === '' ? '' : 'YOUR BEST OPTION'}</Text>
        <Text style={styles.resultText2}>{this.props.bestResult}</Text>
        <Button title='HOME' onPress={this.onHomeButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle} icon={{
          name: 'home'
        }}/>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingTop: 15
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
  resultText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: socialColors.smithGreen,
    fontWeight: 'bold'
  },
  resultText2: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: socialColors.smithGreen,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  decisionText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 18,
    color: socialColors.smithGreen,
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

const mapStateToProps = state => {

  const {selectedDecision, decisionId} = state;

  console.log(state.selectedDecision.options);
  let resArr = [];
  for (var prop in state.selectedDecision.options) {
    if (state.selectedDecision.options.hasOwnProperty(prop)) {
      resArr.push({score: state.selectedDecision.options[prop].optionScore, option: state.selectedDecision.options[prop].option});
    }
  }
  console.log(resArr);
  let bestResult;

  if (resArr.length > 0) {
    console.log(resArr.sort(function(a, b){return b.score - a.score}));
    bestResult = resArr.sort(function(a, b){return b.score - a.score})[0].option;
  } else {
    bestResult = "";
  }

  //obtain scoreOptions from decision

  const scoreOptions = _.map(state.selectedDecision.options, (val, uid) => {
    Reactotron.log("mapping options");
    Reactotron.log(val);
    Reactotron.log(uid);
    return {option: val.option, optionScorePercentage: val.optionScorePercentage, optionScore: val.optionScore, uid};
  });

  return {decisionId, scoreOptions, selectedDecision, bestResult};

};

export default connect(mapStateToProps, {getDecision})(Results);
