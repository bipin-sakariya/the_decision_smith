import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View, StyleSheet, Image, Platform} from 'react-native';
import { pay } from '../actions';
import {Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import DecisionForm from './DecisionForm';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import moment from 'moment';
// import * as RNIap from 'react-native-iap';

const itemSkus = Platform.select({
  ios: [
    'com.tds.tdz'
  ],
  android: [
    'com.tds.tds'
  ]
});

class PaymentPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hasLoadedIAP: false
      }
    }

    componentDidMount() {
      this.prepareIAP();
    }

    async prepareIAP() {
      try {
        // await RNIap.prepare();
        this.getAvailableItems();
      } catch(err) {
        console.warn(err);
      }
    }

    async getAvailableItems() {
      try {
        // const products = await RNIap.getProducts(itemSkus);
        // console.log('Products: ', products);
        this.setState({hasLoadedIAP: true});
      } catch(err) {
        console.warn(err); // standardized err.code and err.message available
      }
    }

    onButtonPress() {
      // this.props.pay('options');
    }

    IAPStatus() {
      if (this.state.hasLoadedIAP) {
        return (
          <Button title='Proceed' onPress={this.onButtonPress.bind(this)} backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle}/>
        )
      } else {
        return (
          <Button title='Initialising...' backgroundColor={socialColors.smithPrimary} style={styles.buttonStyle}/>
        )
      }
    }

    render() {
      const {payment} = this.props;

        return (
          <ScrollView>
            <View>
              <Image source={require('../assets/logo.jpg')} style={{
                flex: 1,
                height: 150,
                width: 350,
                justifyContent: 'center'
              }}/>
            <Text style={styles.instructionText}>The free version of this app enables you to create {payment === 'options' ? 'two' : 'five'} {payment}. You can upgrade here to add more features.</Text>
            </View>
            {this.IAPStatus()}
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
  helperText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 14,
    color: socialColors.smithBlue
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
  console.log(state.payment);
  const payment = state.payment;
  return { payment };
};

export default connect(mapStateToProps, {pay})(PaymentPage);
