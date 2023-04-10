import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import ListView from "deprecated-react-native-listview";
import socialColors from '../config/socialColors.js';

export default class Instructions extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource:[
        { header: 'STEP 1', data: 'IDENTIFYING the DECISION you are faced with will be the first step.' },
        { header: 'STEP 2', data: 'Then you\'ll LIST the OPTIONS you currently have.' },
        { header: 'STEP 3', data: 'Take some time to determine the FACTORS that are important to you. You\'ll be asked to DEFINE all of your FACTORS' },
        { header: 'STEP 4', data: 'RATE how important each FACTOR is to you right now' },
        { header: 'STEP 5', data: 'For each of your OPTIONS, SCORE how well they satisfy each FACTOR' },
        { header: 'RESULTS', data: 'AFTER an analysis of your entered data, YOUR BEST OPTION will be revealed' }
      ],
    };
  }

  renderRow({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.headerText}>
          {item.header}
        </Text>
        <Text style={styles.rowText}>
          {item.data}
        </Text>
      </View>
    )
  }

  render() {
    return (
      // <ListView
      //   style={styles.container}
      //   dataSource={this.state.dataSource}
      //   renderRow={(data) => this.renderRow(data)} enableEmptySections/>
      <FlatList
        style={styles.container}
        data={this.state.dataSource}
        renderItem={this.renderRow}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  row: {
    backgroundColor: socialColors.smithPurple,
    marginLeft: "5%",
    width: "90%",
    marginTop: 20,
    padding: 3
  },
  headerText: {
    color: "white",
    marginBottom: 5
  },
  rowText: {
    color: 'white'
  }
});
