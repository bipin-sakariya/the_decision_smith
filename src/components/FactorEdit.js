import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Modal, StyleSheet, Image, ActivityIndicator, Alert} from 'react-native';
import {Card, CardSection, Confirm} from './common';
import {factorUpdate, factorEdit, factorDelete} from '../actions';
import {Button, Text, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import FactorForm from './FactorForm';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import moment from 'moment';
import Reactotron from 'reactotron-react-native';
import {Actions} from 'react-native-router-flux';
import Network from './Network';

class FactorEdit extends Component {
    // component level state
    state = {
        showModal: false
    };

    onDecline = () => {
      this.setState({showModal: false});
    }

    onAccept = () => {
      const factorId = this.props.navigation.state.params.factor.uid;
      const decisionId = this.props.decisionId;
      this.props.factorUpdate({prop: 'loading', value: true});
      this.props.factorDelete({decisionId, factorId});
      this.setState({showModal: false});
    }

    componentWillMount() {
        //let navObj = Actions.state.routes[1].routes[1].params;
        console.log(Actions.state);
        if (Actions.state.factor) {
            _.each(Actions.state.factor, (value, prop) => {
                this.props.factorUpdate({prop, value});
            });
        }
    }

    onSaveButtonPress() {
      const {uid} = this.props.navigation.state.params.factor;
      const {factor, decisionId} = this.props;
      if (factor) {
        if (factor.trim().length === 0) {
          Alert.alert(
            'Error',
            'Please fill out form',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ],
            { cancelable: false }
          )
          return;
        }
        this.props.factorUpdate({prop: 'loading', value: true});
        this.props.factorEdit({factor, factorId: uid, decisionId});
      }
    }

    onDeleteButtonPress() {
      this.setState({
        showModal: !this.state.showModal
      });
    }

    onCancelButtonPress() {
        Actions.pop();
    }

    renderButtons() {
      if (this.props.loading) {
        return <ActivityIndicator size="large" color="#00ff00" />
      } else {
        return (
          <View>
            <Button title='Save' onPress={this.onSaveButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle}/>
            <Button title='Delete Factor' onPress={this.onDeleteButtonPress.bind(this)} backgroundColor={colors.smithGrey} style={styles.buttonStyle}/>
            <Button title='Cancel' onPress={this.onCancelButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle}/>
          </View>
        )
      }
    }

    render() {
        return (
          <ScrollView>
            <Network />
            <View>
              <Image source={require('../assets/logo.jpg')} style={{
                flex: 1,
                height: 150,
                width: 350,
                justifyContent: 'center',
              }}/>
            <Text style={styles.headingText}>EDIT FACTOR</Text>
            <Text style={styles.instructionText}>What are the things you are taking into consideration when making this decision?</Text>

            </View>
            <FactorForm {...this.props}/>
            {this.renderButtons()}
            <Confirm visible={this.state.showModal} onDecline={this.onDecline.bind(this)} onAccept={this.onAccept.bind(this)}>
                Are you sure you want to delete this factor?
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
    const factor = state.factorForm.factor;
    const loading = state.factorForm.loading;
    const factorId = state.factorForm.uid;
    const decisionId = state.decisionId;
    console.log('uu: ', factor);
    return {factor, factorId, decisionId, loading};
};

export default connect(mapStateToProps, {factorUpdate, factorEdit, factorDelete})(FactorEdit);
