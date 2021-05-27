import axios from 'axios';
import {CREATE_CARD_FAILURE, CREATE_CARD_PENDING, CREATE_CARD_SUCCESS  } from '../constants/actionTypes';

export const createCard = (cardTypeId, cardHolderName, accountNum) =>{
    return dispatch => {
        console.log(cardTypeId, cardHolderName, accountNum);
        dispatch(_createCardStarted());
        return axios.post(
            'http://localhost:8081/api/cards/',
            {
             accountNumber: accountNum,
             cardType: cardTypeId,
             holderName: cardHolderName
            }
        )
        .then( (res) => {
            dispatch(_createCardSuccess(res));
        })
        .catch((error) => {
            console.log(error);
            dispatch(_createCardFailed(error));
        });
}
}

const _createCardStarted = () => {
    return {
        type: CREATE_CARD_PENDING
    };
}

const _createCardFailed = () => {
    return {
        type: CREATE_CARD_FAILURE
    };
}

const _createCardSuccess = () =>{
    return {
        type: CREATE_CARD_SUCCESS
    };
}