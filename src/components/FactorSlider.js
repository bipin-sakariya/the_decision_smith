import React, {Component} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {CardSection} from './common';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Reactotron from 'reactotron-react-native';
import {Slider, Text} from 'react-native-elements';


class FactorSlider extends Component {

    sliderValueChanged(factorId, weight) {
      console.log(factorId, weight);
      const {decisionId} = this.props;
      console.log(`Updating Decision: ${decisionId} - Factor: ${factorId} with weight: ${weight}`);
      this.props.sliderChanges({factorId, decisionId, weight});
      //this.props.weightFactor({factorId, decisionId, weight});
    }

    render() {
        const {factor, uid, weight} = this.props.factor;
        return (
            <CardSection>
                <View style={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    marginLeft: 5,
                    marginRight: 5,
                    marginBottom: 10
                }}>
                    <Text style={styles.sliderTitle}>{factor}</Text>
                    <Slider maximumValue={10} minimumValue={1} value={weight} step={1} onSlidingComplete={(value) => this.sliderValueChanged(uid, value)}/>
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
                            <Text style={styles.sliderSubTitle}>not very{"\n"}important</Text>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <Text style={styles.sliderSubTitle}>important</Text>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={styles.sliderSubTitle}>extremely{"\n"}important</Text>
                        </View>
                    </View>
                </View>
            </CardSection>
        )
    }

}

const styles = {
    sliderTitle: {
        fontSize: 18,
        color: socialColors.smithBlue,
        marginTop:5
    },
    sliderSubTitle: {
        fontSize: 12
    }
}

export default FactorSlider;
