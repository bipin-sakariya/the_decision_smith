import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-native';
import {employeeUpdate, employeeEdit, employeeDelete} from '../actions';
import Communications from 'react-native-communications';
import {Card, CardSection, Button, Confirm} from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {

    // component level state
    state = {
      showModal: false,
    };

    onDecline = () => {
      this.setState({showModal: false});
    }

    onAccept = () => {
      const {uid} = this.props;
      this.props.employeeDelete({uid});
    }

    componentWillMount(){
      //console.log(this.props.employee);
      _.each(this.props.employee, (value, prop) => {
        this.props.employeeUpdate({prop, value});
      });
    }

    onButtonPress() {
        const {uid, name, phone, shift} = this.props;
        this.props.employeeEdit({ uid, name, phone, shift: shift || 'Monday' });

    }

    onTextButtonPress() {
        const {name, phone, shift} = this.props;
        Communications.text(phone, `${name}, confirming your shift is on: ${shift}`);

    }

    onDeleteButtonPress(){
      this.setState({showModal: !this.state.showModal});
    }
    render() {
        return (
            <Card>
                <EmployeeForm {...this.props}/>

                <CardSection>
                    <Button onPress={this.onTextButtonPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onDeleteButtonPress.bind(this)}>
                        Fire Employee
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>
                <Confirm
                  visible={this.state.showModal}
                  onDecline={this.onDecline.bind(this)}
                  onAccept={this.onAccept.bind(this)}
                  >
                  Are you sure you want to fire this employee?
                </Confirm>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {

    const {uid, name, phone, shift} = state.employeeForm;
    return {uid, name, phone, shift};

};

export default connect(mapStateToProps, {employeeUpdate, employeeEdit, employeeDelete})(EmployeeEdit);
