import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Image} from 'react-native';
import ListView from "deprecated-react-native-listview";
import {List, ListItem, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {factorsFetch, factorUpdate} from '../actions';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';

class FactorsList extends Component {

    componentWillMount() {
        this.props.factorsFetch(this.props.decisionId);
        this.createDataSource(this.props);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   const {decisionId, factors} = this.props;
    //   if(decisionId === nextProps.decisionId &&
    //     factors === nextProps.factors
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

    renderRow(factor) {
        console.log(factor);
        //return <DecisionListItem decision={decision}/>;
        return (<ListItem key={factor.uid} title={factor.factor} onPress={() => {
          this.props.factorUpdate({prop: 'factor', value: factor.factor});
          Actions.FactorEditRoute({factor: factor})
        }}/>)
    }

    onWeightFactorsButtonPress() {
        Actions.WeightFactorsRoute();
    }

    onListOptionsButtonPress() {
      Actions.pop();
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
            <Text style={styles.headingText}>STEP 3: DEFINE YOUR FACTORS</Text>
            <Text style={styles.instructionText}>Click on the + sign in the top right corner to add a new factor or select from the factors below. Once completed,
              move to Step 4 to RATE YOUR FACTORS.
            </Text>
            <View style={{
              backgroundColor: 'white'
            }} keyboardShouldPersistTaps="always">
            <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections/>

            </View>
            <Button title='4. RATE FACTORS' onPress={this.onWeightFactorsButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle} rightIcon={{
                name: 'chevron-right'
            }}/>
            <Button title='2. LIST OPTIONS' onPress={this.onListOptionsButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle} icon={{
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
    const factors = _.map(state.factors, (val, uid) => {
        return {factor: val.factor, uid};
    });

    const decisionId = state.decisionId;
    return {factors, decisionId};

};

export default connect(mapStateToProps, {factorsFetch, factorUpdate})(FactorsList);
