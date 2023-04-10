import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import ListView from "deprecated-react-native-listview";
import {List, ListItem, Slider, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {factorsFetch, scoreOption, startOptionSaving} from '../actions';
import {CardSection} from './common';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Reactotron from 'reactotron-react-native';
import ScoreOptionSlider from './ScoreOptionSlider';
import Network from './Network';
import CalculationModal from './CalculationModal';

class ScoreOption extends Component {
    constructor(props) {
      super(props);

      this.state = {
        change: [],
        saving: false
      }
    }

    componentWillMount() {
      this.props.factorsFetch(this.props.decisionId);
      this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        //nextProps are the next set of props that this component will be rendered with
        //this.props is the old set of props

        this.createDataSource(nextProps);

    }

    createDataSource({factors}) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(factors);
    }

    calculateScoredFactorWeighting(factorId){
      var factorWeight = _.get(this.props.option.factorScores,[factorId,'weight']);
      var factorScore = _.get(this.props.option.factorScores,[factorId,'score']);
      console.log(factorWeight, factorScore, this.props.option); /* Problem is with factor score */
      if(factorWeight > 0){
        return parseInt(factorScore)/parseInt(factorWeight);
      } else{
        return 0;
      }

      /*_.map(this.props.option.factorScores, function(factorScore){
        Reactotron.log("iterating a factorScore:"+factorScore.uid);
        Reactotron.log(factorScore);
        if(factorScore.uid == factorId){
          Reactotron.log("found factor with id:"+ factorId);
          Reactotron.log(factorScore);
          if(factorScore.weight > 0){
            return parseInt(factorScore.score)/parseInt(factorScore.weight);
          }
          else{
            return 0;
          }
        }
        else{
          return 0;
        }
      });*/
    }

    renderRow(factor, scoreOptionFunction, decisionId){
      Reactotron.log("Factor from state: "+factor.factor);
      Reactotron.log(factor);

      Reactotron.log("Option With factorScores from props: "+ this.props.option.option);
      Reactotron.log(this.props.option);

      //calculate the slider value (-2:2)
      // divide factorScore in option  by factor weight (lookup factor id in factorScores)
      // otherwise return 0

      var factorWeight = this.calculateScoredFactorWeighting(factor.uid);
      console.log(factorWeight, factor, decisionId, this.props.scoreOptionFunction, this.props.option.uid);

      // pass in the scoreOptionFunction
      return <ScoreOptionSlider Slider factorWeight={factorWeight} factor={factor} decisionId={decisionId} scoreOptionFunction={scoreOptionFunction} sliderChanges={this.sliderChanges.bind(this)} optionId={this.props.option.uid}/>;
    }

    async saveData() {
      console.log(this.state.saving);

      this.props.startOptionSaving();

      this.props.scoreOptionFunction(this.state.change);
    }

    async onSaveButtonPress() {
      if (this.state.change.length > 0) {
        this.saveData();
      } else {
        Actions.pop();
      }
      //Actions.ScoreOptionsListRoute();
    }

    onCancelButtonPress() {
      Actions.pop();
    }

    renderSaveButton() {
      console.log('Did you catch me? ' + this.props.optionSave);
      if (this.props.optionSave) {
        return <ActivityIndicator size="large" color="#00ff00" />
      } else {
        return (
          <View>
            <Button title='Save' onPress={this.onSaveButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} />
            <Button title='Cancel' onPress={this.onCancelButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle} />
          </View>
        )
      }
    }

    sliderChanges(data) {
      console.log('Called slider change', data);
      console.log(this.state.change);

      let index;
      for (var i = 0; i < this.state.change.length; i++) {
        if (this.state.change[i].factorId === data.factorId) {
          index = i + 1;
        }
      }

      if (index) {
        this.state.change.splice(index - 1, 1);
      }
      this.state.change.push(data);
    }

    render() {
      console.log(this.dataSource);
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
            }}/>
            <Text style={styles.headingText}>SCORE YOUR OPTIONS</Text>
            <Text style={styles.instructionText}>
              It's time to SCORE YOUR OPTIONS against the FACTORS you have chosen. Start with the first Option and stay focused on that one until
              you've completed it. Make sure you scroll down through all of the FACTORS, then click save to SCORE the remaining OPTIONS.
            </Text>
            <Text style={styles.instructionText2}>
              USE THIS SENTENCE each time
            </Text>
            <Text style={styles.instructionText}>
              If I were to choose this OPTION, it would have an XX impact on this FACTOR. Use these to fill in the XX. VP = VERY POSITIVE, P = POSITIVE,
              O = NEUTRAL, N = NEGATIVE, VN = VERY NEGATIVE. Example: If I were to buy this house, it would have a very positive impact on cost.
            </Text>
            <Text style={styles.subHeadingText}>{this.props.option.option}</Text>
            <View style={{
              backgroundColor: 'white'
            }} keyboardShouldPersistTaps="always">
            <ListView dataSource={this.dataSource} renderRow={(factor) => this.renderRow(factor, this.props.scoreOptionFunction, this.props.decisionId)} enableEmptySections/>
            </View>
            {this.renderSaveButton()}
            <CalculationModal isVisible={this.props.optionSave}/>
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
  subHeadingText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
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
  instructionText2: {
    flex: 1,
    textDecorationLine: 'underline',
    justifyContent: 'center',
    textAlign: 'center',
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
    const factors = _.map(state.factors, (val, uid) => {
      return {factor: val.factor, uid, weight: val.weight};
    });

    const {decisionId, optionSave} = state;
    return {factors, decisionId, optionSave};
};

export default connect(mapStateToProps, {factorsFetch, scoreOption, startOptionSaving})(ScoreOption);
