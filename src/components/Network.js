import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

export default class Network extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: true
    }
  }

  componentWillMount() {
    NetInfo.fetch().then((connectionInfo) => {
      console.log(connectionInfo, 'Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });
  }

  componentDidMount() {
    // NetInfo.addEventListener(
    //   'connectionChange',
    //   this.handleConnectivityChange
    // );
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    console.log('Change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    let status = connectionInfo.type.toLowerCase();
    if (status === 'none') {
      this.setState({connected: false});
    } else {
      this.setState({connected: true});
    }
  }

  renderConnectionStatus() {
    if (this.state.connected) {
      return null
    } else {
      return (
        <View style={styles.textView}>
          <Text style={styles.text}>No Internet connection</Text>
        </View>
      )
    }
  }

  render() {
    return (
      this.renderConnectionStatus()
    )
  }
}

const styles = StyleSheet.create({
  textView: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
});
