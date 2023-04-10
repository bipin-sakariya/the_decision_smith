import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, Image, StyleSheet} from 'react-native';
import ListView from "deprecated-react-native-listview";
import {List, ListItem, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {optionsFetch, getDecision, optionUpdate} from '../actions';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';

class OptionsList extends Component {

  componentWillMount() {
    this.props.getDecision(this.props);
    this.props.optionsFetch(this.props.decisionId);
    this.createDataSource(this.props);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const {decisionId, options} = this.props;
  //   if(decisionId === nextProps.decisionId &&
  //     options === nextProps.options
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

  renderRow(option) {
    console.log(option, this.props);
    //return <DecisionListItem decision={decision}/>;
    return (<ListItem key={option.uid} title={option.option} onPress={() => {
      this.props.optionUpdate({prop: 'option', value: option.option});
      Actions.OptionEditRoute({option: option})
    }}/>)
  }

  onFactorsButtonPress() {
    const {decisionId} = this.props;
    Actions.FactorsListRoute({decisionId: decisionId});
  }

  onHomeButtonPress() {
    Actions.popTo('DecisionListRoute');
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
        <Text style={styles.headingText}>STEP 2: LIST YOUR OPTIONS</Text>
        <Text style={styles.instructionText}>Click on the + sign in the top right corner to add a new option or select from the options below. Once completed, move to Step 3 to DEFINE YOUR FACTORS.</Text>
        <View style={{
          backgroundColor: 'white'
        }} keyboardShouldPersistTaps="always">
          <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections/>
        </View>
        <Button title='3. DEFINE FACTORS' onPress={this.onFactorsButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} rightIcon={{
          name: 'chevron-right'
        }}/>
        <Button title='HOME' onPress={this.onHomeButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle} icon={{
          name: 'home'
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
    return {option: val.option, uid};
  });

  const decisionId = state.decisionId;
  return {options, decisionId};

};

export default connect(mapStateToProps, {optionsFetch, getDecision, optionUpdate})(OptionsList);
