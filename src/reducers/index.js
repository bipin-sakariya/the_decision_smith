import { combineReducers} from 'redux';
import AuthReducer from './AuthReducer'
import EmployeeFormReducer from './EmployeeFormReducer'
import EmployeeReducer from './EmployeeReducer'
import DecisionFormReducer from './DecisionFormReducer'
import DecisionsReducer from './DecisionsReducer'
import DecisionReducer from './DecisionReducer'
import DecisionIdReducer from './DecisionIdReducer'
import OptionsReducer from './OptionsReducer'
import OptionFormReducer from './OptionFormReducer'
import FactorFormReducer from './FactorFormReducer'
import FactorsReducer from './FactorsReducer'
import PaymentReducer from './PaymentReducer'
import UniversalLoadingReducer from './UniversalLoading'
import FactorSaveReducer from './FactorSaveReducer'
import OptionSaveReducer from './OptionSaveReducer'

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer,
  decisionId: DecisionIdReducer,
  decisionForm: DecisionFormReducer,
  decisions: DecisionsReducer,
  selectedDecision: DecisionReducer,
  options: OptionsReducer,
  optionForm: OptionFormReducer,
  factorForm: FactorFormReducer,
  factors: FactorsReducer,
  payment: PaymentReducer,
  universalLoading: UniversalLoadingReducer,
  factorSave: FactorSaveReducer,
  optionSave: OptionSaveReducer
});
