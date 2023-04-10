import React, {Component} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {CardSection} from './common';
import socialColors from '../config/socialColors.js';
import colors from '../config/colors.js';
import Reactotron from 'reactotron-react-native';
import {Slider, Text} from 'react-native-elements';

class ScoreOptionSlider extends Component {
    sliderValueChanged(factorId, score) {
      const {decisionId, optionId} = this.props;
      console.log(`Updating Option Score for DecisionId: ${decisionId} - Option: ${optionId} Factor: ${factorId} with score: ${score}`);
      this.props.sliderChanges({optionId, factorId, decisionId, score});
      //this.props.scoreOptionFunction({optionId, factorId, decisionId, score});
    }

    setSliderValue(aValue, factorWeight){
      // need to reverse weighted value back to -2 : 2, or return 0

      if(aValue){
        return factorWeight/aValue;
      }
      else{
        return 0
      }
    }

    render() {
        const {factor, uid, weight} = this.props.factor;
        // expecting this.props.scoreOption as function - undefined
        // check what is being passed in from parent (ScoreOptionsList)
        // need to check if optionScore.isScored = true, then divide optionScore.score/optionScore.weight

        console.log("Rendering a Slider "+ factor);
        console.log("Look for scoreOptionFunction")
        console.log(this.props);

        return (
            <CardSection>
                <View style={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    marginLeft: 5,
                    marginRight: 5
                }}>
                    <Text style={styles.sliderTitle}>{factor}</Text>
                    <Slider maximumValue={2} minimumValue={-2} value={this.props.factorWeight} step={1} onSlidingComplete={(value) => this.sliderValueChanged(uid, value)}/>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 5,
                        marginRight: 5,
                        justifyContent: 'space-evenly'
                    }}>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            <Text style={styles.sliderSubTitle}>VN</Text>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            paddingLeft: '5%'
                        }}>
                            <Text style={styles.sliderSubTitle}>N</Text>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingRight: '0%'
                        }}>
                            <Text style={styles.sliderSubTitle}>O</Text>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingRight: '5%'
                        }}>
                            <Text style={styles.sliderSubTitle}>P</Text>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={styles.sliderSubTitle}>VP</Text>
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

export default ScoreOptionSlider;
