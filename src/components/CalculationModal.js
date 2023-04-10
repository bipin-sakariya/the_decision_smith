import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

export default class CalculationModal extends Component {

  render() {
    return (
      <View>
        <Modal
          isVisible={this.props.isVisible}
          onBackdropPress={() => null}
          onBackButtonPress={() => null}
        >
          <View style={styles.viewStyle}>
            <View style={styles.innerViewStyle}>
              <Text style={styles.textStyle}>Please be patient - making good decisions takes time and we want to make sure all calculations are thorough.</Text>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  innerViewStyle: {
    height: 100,
    backgroundColor: 'white',
    padding: 5,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  textStyle: {
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center'
  }
})
