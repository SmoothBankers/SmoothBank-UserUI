import axios from 'axios';
import {CREATE_LOAN_FAILURE, CREATE_LOAN_PENDING, CREATE_LOAN_SUCCESS  } from '../constants/actionTypes';

export const createLoan = (loanTypeId, loanHolderName, accountNum) =>{
    return dispatch => {
        console.log(loanTypeId, loanHolderName, accountNum);
        dispatch(_createLoanStarted());
        return axios.post(
            'http://localhost:8081/api/loans/',
            {
             accountNumber: accountNum,
             loanType: loanTypeId,
             holderName: loanHolderName
            }
        )
        .then( (res) => {
            dispatch(_createLoanSuccess(res));
        })
        .catch((error) => {
            console.log(error);
            dispatch(_createLoanFailed(error));
        });
}
}

const _createLoanStarted = () => {
    return {
        type: CREATE_LOAN_PENDING
    };
}

const _createLoanFailed = () => {
    return {
        type: CREATE_LOAN_FAILURE
    };
}

const _createLoanSuccess = () =>{
    return {
        type: CREATE_LOAN_SUCCESS
    };
}