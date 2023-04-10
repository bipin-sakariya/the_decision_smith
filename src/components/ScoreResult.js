import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {CardSection} from './common';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Reactotron from 'reactotron-react-native';
import {Text} from 'react-native-elements';

class ScoreResult extends Component {

    render() {
        const {option, score, percent, isPerfect} = this.props;

        return (
            <CardSection>
                <View style={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    marginLeft: 3,
                    marginRight: 3
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 5,
                        marginRight: 5,
                        alignItems: 'stretch'
                    }}>
                    <View style={{
                        flex:1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}>
                        <Text style={styles.sliderTitle}>{this.props.option}</Text>
                    </View>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Text style={styles.sliderTitle}>{this.props.score}</Text>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Text style={styles.sliderTitle}>{this.props.percent}%</Text>
                        </View>
                    </View>
                </View>
            </CardSection>
        )
    }

}

const styles = {
    sliderTitle: {
        fontSize: 18
    },
    sliderSubTitle: {
        fontSize: 10
    }
}

export default ScoreResult;
