import { READ_LOAN_TYPES_SUCCESS, READ_LOAN_TYPES_PENDING, READ_LOAN_TYPES_FAILURE} from '../constants/actionTypes';

export default function loanTypeReducer(state = {}, action) {
    switch(action.type){
        case READ_LOAN_TYPES_SUCCESS:
            return {...state, loanTypeData: {types: action.data, requestSuccess: true}};
        case READ_LOAN_TYPES_PENDING:
            return {...state, loanTypeData: {requestPending: true}};
        case READ_LOAN_TYPES_FAILURE:
            return {...state, loanTypeData:{requestFailed: true}};
        default:
                return state;
        }
    }