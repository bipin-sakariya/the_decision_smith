import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Modal, StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import {Card, CardSection, Confirm} from './common';
import {optionUpdate, optionEdit, optionDelete} from '../actions';
import {Button, Text, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import OptionForm from './OptionForm';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import moment from 'moment';
import Reactotron from 'reactotron-react-native';
import {Actions} from 'react-native-router-flux';
import Network from './Network';

class OptionEdit extends Component {
    // component level state
    state = {
        showModal: false
    };

    onDecline = () => {
        this.setState({showModal: false});
    }

    onAccept = () => {
      const optionId = this.props.navigation.state.params.option.uid;
      const decisionId = this.props.decisionId;
      this.props.optionUpdate({prop: 'loading', value: true});
      this.props.optionDelete({decisionId, optionId});
      this.setState({showModal: false});
    }

    componentWillMount() {
        //let navObj = Actions.state.routes[1].routes[1].params;
        console.log(Actions.state);
        if (Actions.state.option) {
            _.each(Actions.state.option, (value, prop) => {
                this.props.optionUpdate({prop, value});
            });
        }
    }

    onSaveButtonPress() {
      const {uid} = this.props.navigation.state.params.option;
      const {option} = this.props;
      const {decisionId} = this.props;
      console.log(this.props, uid);
      if (option) {
        if (option.trim().length === 0) {
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
        this.props.optionUpdate({prop: 'loading', value: true});
        this.props.optionEdit({option, optionId: uid, decisionId});
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
            <Button title='Delete Option' onPress={this.onDeleteButtonPress.bind(this)} backgroundColor={colors.smithGrey} style={styles.buttonStyle}/>
            <Button title='Cancel' onPress={this.onCancelButtonPress.bind(this)} backgroundColor={socialColors.smithTertiary} style={styles.buttonStyle}/>
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
            <Text style={styles.headingText}>EDIT OPTION</Text>
            <Text style={styles.instructionText}>Specify one of the choices you need to evaluate</Text>

            </View>
            <OptionForm
              {...this.props}
              optionEdit={this.props.navigation.state.params.option.option}
            />
            {this.renderButtons()}
            <Confirm visible={this.state.showModal} onDecline={this.onDecline.bind(this)} onAccept={this.onAccept.bind(this)}>
                Are you sure you want to delete this option?
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
    const option = state.optionForm.option;
    const loading = state.optionForm.loading;
    const optionId = state.optionForm.uid;
    const decisionId = state.decisionId;
    return {option, optionId, decisionId, loading};

};

export default connect(mapStateToProps, {optionUpdate, optionEdit, optionDelete})(OptionEdit);
