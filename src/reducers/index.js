import { combineReducers } from 'redux';
import cardTypeReducer from './cardTypeReducer';
import loanTypeReducer from './loanTypeReducer';
import cardReducer from './cardReducer';
import loanReducer from './loanReducer';

const rootReducer = combineReducers({
  cardTypeReducer,
  loanTypeReducer,
  cardReducer,
  loanReducer
});

export default rootReducer;
