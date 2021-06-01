import {CREATE_CARD_FAILURE, CREATE_CARD_PENDING, CREATE_CARD_SUCCESS} from '../constants/actionTypes';
export default function cardReducer(state = {}, action) {
    switch(action.type){
        case CREATE_CARD_SUCCESS:
            return {...state, cardData: {types: action.data, requestSuccessful: true}};
        case CREATE_CARD_PENDING:
            return {...state, cardData: {requestPending: true}};
        case CREATE_CARD_FAILURE:
            return {...state, cardData:{requestFailed: true}};
        default:
                return state;
        }
    }