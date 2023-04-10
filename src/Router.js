import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import InitialView from './components/InitialView';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import SignUpForm from './components/SignUpForm';

import DecisionsList from './components/DecisionsList';
import DecisionCreate from './components/DecisionCreate';
import DecisionEdit from './components/DecisionEdit';

import OptionsList from './components/OptionsList';
import OptionCreate from './components/OptionCreate';
import OptionEdit from './components/OptionEdit';

import FactorsList from './components/FactorsList';
import FactorCreate from './components/FactorCreate';
import FactorEdit from './components/FactorEdit';
import WeightFactors from './components/WeightFactors';
import ScoreOptionsList from './components/ScoreOptionsList';
import ScoreOption from './components/ScoreOption';

import Results from './components/Results';

import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

import PaymentPage from './components/PaymentPage';

import Menu from './components/Menu';
import Instructions from './components/Instructions';
import Legal from './components/Legal';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{
            //paddingTop: 60
        }}>
            <Stack key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="InitialViewRoute" component={InitialView} title="The Decision Smith" initial />
                    <Scene key="LoginRoute" component={LoginForm} back title="The Decision Smith" />
                    <Scene key="SignUpFormRoute" component={SignUpForm} back title="Sign Up" />
                    <Scene key="ForgotPasswordRoute" component={ForgotPassword} back title="Forgot Password" />
                    <Scene key="LegalInit" component={Legal} back title="Legal" />
                </Scene>
                <Scene key="main">
                    <Scene key="DecisionListRoute" component={DecisionsList} title="The Decision Smith" onLeft={() => Actions.Menu()} onRight={() => Actions.DecisionCreateRoute()} leftButtonImage={require('./assets/icons8-menu-50.png')} rightButtonImage={require('./assets/icons8-plus-math-26.png')} />
                    <Scene key="DecisionCreateRoute" component={DecisionCreate} back title="New Decision" />
                    <Scene key="DecisionEditRoute" component={DecisionEdit} title="Identify Decision" />
                    <Scene key="OptionsListRoute" component={OptionsList} back title="List Options" onRight={() => Actions.OptionCreateRoute()} rightButtonImage={require('./assets/icons8-plus-math-26.png')} />
                    <Scene key="OptionCreateRoute" component={OptionCreate} title="New Option" />
                    <Scene key="OptionEditRoute" component={OptionEdit} title="Edit Option" />
                    <Scene key="FactorsListRoute" component={FactorsList} back title="Define Factors" onRight={() => Actions.FactorCreateRoute()} rightButtonImage={require('./assets/icons8-plus-math-26.png')} />
                    <Scene key="FactorCreateRoute" component={FactorCreate} title="New Factor" />
                    <Scene key="FactorEditRoute" component={FactorEdit} title="Edit Factor" />
                    <Scene key="WeightFactorsRoute" component={WeightFactors} title="Rate Factors" />
                    <Scene key="ScoreOptionsListRoute" component={ScoreOptionsList} title="Score Options" />
                    <Scene key="ScoreOptionRoute" component={ScoreOption} title="Score Options" />
                    <Scene key="ResultsRoute" component={Results} back title="Results" />
                    <Scene key="PaymentRoute" component={PaymentPage} title="Upgrade" />
                    <Scene key="Menu" component={Menu} back title="Menu" />
                    <Scene key="Instructions" component={Instructions} back title="INSTRUCTIONS" />
                    <Scene key="Legal" component={Legal} back title="Legal" />
                </Scene>
                <Scene key="employees">
                    <Scene key="EmployeeListRoute" component={EmployeeList} title="Employees" onRight={() => Actions.EmployeeCreateRoute()} rightTitle="Add" />
                    <Scene key="EmployeeCreateRoute" component={EmployeeCreate} title="Create Employee" />
                    <Scene key="EmployeeEditRoute" component={EmployeeEdit} title="Edit Employee" />
                </Scene>
            </Stack>
        </Router>
    );
};

export default RouterComponent;
