import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Image} from 'react-native';
import ListView from "deprecated-react-native-listview";
import {List, ListItem, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {optionsFetch, scoreOption, registerDecisionId} from '../actions';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Reactotron from 'reactotron-react-native';
import ScoreOptionSlider from './ScoreOptionSlider';

class ScoreOptionsList extends Component {

    componentWillMount() {
        this.props.optionsFetch(this.props.decisionId); // get the options for this decision
        this.createDataSource(this.props);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   const {decisionId, scoreOption, options} = this.props;
    //   if(decisionId === nextProps.decisionId &&
    //     options === nextProps.options && scoreOption === nextProps.scoreOption
    //   ) {
    //     return false;
    //   }
    //   return true;
    // }

    componentWillReceiveProps(nextProps) {
        //nextProps are the next set of props that this component will be rendered with
        //this.props is the old set of props

        this.createDataSource(nextProps);
    }

    createDataSource({options}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(options);
    }

    /*renderRow(factor, scopeOption, decisionId){
      return <ScoreOptionSlider factor={factor} decisionId={decisionId} scoreOption={scoreOption}/>;
    }*/
    renderRow(option, scoreOptionFunction, decisionId) {
      //option should contain factorScores
      Reactotron.log("rendering an option");
      console.log(option);
      let icon;
      if (option.isScored) {
        icon = 'done';
      } else {
        icon = 'chevron-right';
      }

      return (<ListItem key={option.uid} title={option.option} rightIcon={{name: icon}} onPress={() => {
        Actions.ScoreOptionRoute({option: option, scoreOptionFunction: scoreOptionFunction, decisionId: decisionId})
      }}/>)
    }

    onRateFactorsButtonPress() {
        const {decisionId} = this.props;
        Actions.pop();
    }

    onResultsButtonPress() {

      Actions.ResultsRoute();

    }


    render() {
      Reactotron.log("Checking this.props.scoreOption");
      Reactotron.log(this.props.scoreOption);
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
            <Text style={styles.headingText}>STEP 5: SCORE YOUR OPTIONS</Text>
            <Text style={styles.instructionText}>Tap an option below to begin scoring. Once you have scored one option, make sure to come back and SCORE EACH OPTION before finding out your RESULTS.</Text>
            <View style={{
              backgroundColor: 'white'
            }} keyboardShouldPersistTaps="always">
            <ListView dataSource={this.dataSource} renderRow={(option) => this.renderRow(option, this.props.scoreOption, this.props.decisionId)} enableEmptySectionsenableEmptySections/>
            </View>
            <Button title='GET YOUR RESULTS' onPress={this.onResultsButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} rightIcon={{
                name: 'chevron-right'
            }}/>
            <Button title='4. RATE FACTORS' onPress={this.onRateFactorsButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle} icon={{
                name: 'chevron-left'
            }}/>
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

const mapStateToProps = state => {
    const options = _.map(state.options, (val, uid) => {
        Reactotron.log("option with OptionScore");
        Reactotron.log(val);
        return {option: val.option, uid: uid, optionScore: val.optionScore, isScored: val.isScored, factorScores: val.scores};
    });

    const decisionId = state.decisionId;
    return {options, decisionId};

};

export default connect(mapStateToProps, {optionsFetch, scoreOption, registerDecisionId})(ScoreOptionsList);
