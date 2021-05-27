import axios from 'axios'

import { READ_LOAN_TYPES_SUCCESS, READ_LOAN_TYPES_FAILURE, READ_LOAN_TYPES_PENDING} from '../constants/actionTypes';

export const readLoanTypes = () => {
  return dispatch => {
      dispatch(_readLoanTypesStarted());
      return axios.get(`http://localhost:8081/api/loanTypes/`)
      .then(res => {
          dispatch(_readLoanTypesSuccess(res));
      })
      .catch( (error) => {
          console.log(error);
          dispatch(_readLoanTypesFailed(error));
      });
  };
}

const _readLoanTypesSuccess = (res) => {
    return {
        type: READ_LOAN_TYPES_SUCCESS,
        data:  res.data
    };
}

const _readLoanTypesFailed = (error) => {
    return {
        type: READ_LOAN_TYPES_FAILURE,
        error  
    };
}

const _readLoanTypesStarted = () => {
    return {
        type: READ_LOAN_TYPES_PENDING
    };
}