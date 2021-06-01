import {CREATE_LOAN_FAILURE, CREATE_LOAN_PENDING, CREATE_LOAN_SUCCESS} from '../constants/actionTypes';
export default function loanReducer(state = {}, action) {
    switch(action.type){
        case CREATE_LOAN_SUCCESS:
            return {...state, loanData: {types: action.data, requestSuccessful: true}};
        case CREATE_LOAN_PENDING:
            return {...state, loanData: {requestPending: true}};
        case CREATE_LOAN_FAILURE:
            return {...state, loanData:{requestFailed: true}};
        default:
                return state;
        }
    }