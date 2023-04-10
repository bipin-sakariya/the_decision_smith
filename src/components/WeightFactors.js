import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import ListView from "deprecated-react-native-listview";
import {List, ListItem, Slider, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {factorsFetch, weightFactor, startFactorSaving} from '../actions';
import {CardSection} from './common';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Reactotron from 'reactotron-react-native';
import FactorSlider from './FactorSlider';
import CalculationModal from './CalculationModal';

class WeightFactors extends Component {
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

    // shouldComponentUpdate(nextProps, nextState) {
    //   const {decisionId, weightFactor, factors} = this.props;
    //   const {change, saving} = this.state;
    //
    //   if(decisionId === nextProps.decisionId && weightFactor === nextProps.weightFactor &&
    //     factors === nextProps.factors &&
    //     change === nextState.change && saving === nextState.saving
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

    createDataSource({factors}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(factors);
    }

    renderRow(factor, weightFactor, decisionId){


      return <FactorSlider factor={factor} decisionId={decisionId} sliderChanges={this.sliderChanges.bind(this)} weightFactor={weightFactor}/>;
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

    async saveData() {
      this.props.startFactorSaving();

      this.props.weightFactor(this.state.change);
    }

    onScoreOptionsButtonPress() {
      if (this.state.change.length > 0) {
        this.saveData();
      } else {
        Actions.ScoreOptionsListRoute();
      }
    }

    onDefineFactorsButtonPress() {
      Actions.pop();
    }

    renderScoreOptionsButton() {
      console.log('Did you catch me? ' + this.props.factorSave);
      if (this.props.factorSave) {
        return <ActivityIndicator size="large" color="#00ff00" />
      } else {
        return (
          <View>
            <Button title='5. SCORE OPTIONS' onPress={this.onScoreOptionsButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} rightIcon={{
                name: 'chevron-right'
            }}/>
            <Button title='3. DEFINE FACTORS' onPress={this.onDefineFactorsButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle} icon={{
                name: 'chevron-left'
            }}/>
          </View>
        )
      }
    }

    render() {

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
            <Text style={styles.headingText}>STEP 4: RATE YOUR FACTORS</Text>
            <Text style={styles.instructionText}>RATE each FACTOR using the scale to identify its importance to you. It is imperative to the process to
              be very honest about what matters to you RIGHT NOW.
              Make sure you scroll down and RATE EACH FACTOR before moving to STEP 5: SCORE YOUR OPTIONS.
            </Text>
            <View style={{
              backgroundColor: 'white'
            }} keyboardShouldPersistTaps="always">
            <ListView dataSource={this.dataSource} renderRow={(factor) => this.renderRow(factor, this.props.weightFactor, this.props.decisionId)} enableEmptySections/>

            </View>
            {this.renderScoreOptionsButton()}
            <CalculationModal isVisible={this.props.factorSave}/>
          </ScrollView>




        )
    }
}



const mapStateToProps = state => {
    const factors = _.map(state.factors, (val, uid) => {
        return {factor: val.factor, uid, weight: val.weight};
    });

    const {decisionId, factorSave} = state;
    return {factors, decisionId, factorSave};

};

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

export default connect(mapStateToProps, {factorsFetch, weightFactor, startFactorSaving})(WeightFactors);
