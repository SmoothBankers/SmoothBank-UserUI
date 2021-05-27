import axios from 'axios'

import { READ_CARD_TYPES_SUCCESSFUL, READ_CARD_TYPES_FAILURE, READ_CARD_TYPES_PENDING} from '../constants/actionTypes';

export const readCardTypes = () => {
  return dispatch => {
      dispatch(_readCardTypesStarted());
      //There's some sort of issue with the .then portion.
      return axios.get(`http://localhost:8081/api/cardTypes/`)
      .then((res) => {
          console.log(res);
          dispatch(_readCardTypesSuccess(res));
      }).catch( (error) => {
          console.log(error);
          dispatch(_readCardTypesFailed(error));
      });
  };
}

const _readCardTypesSuccess = (res) => {
    return {
        type: READ_CARD_TYPES_SUCCESSFUL,
        data:  res.data
    };
}

const _readCardTypesFailed = (error) => {
    return {
        type: READ_CARD_TYPES_FAILURE,
        error  
    };
}

const _readCardTypesStarted = () => {
    return {
        type: READ_CARD_TYPES_PENDING
    };
}