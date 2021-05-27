import { READ_CARD_TYPES_SUCCESSFUL, READ_CARD_TYPES_PENDING, READ_CARD_TYPES_FAILURE} from '../constants/actionTypes';

export default function cardTypeReducer(state = {}, action) {
    switch(action.type){
        case READ_CARD_TYPES_SUCCESSFUL:
            return {...state, cardTypeData: {types: action.data, requestSuccessful: true}};
        case READ_CARD_TYPES_PENDING:
            return {...state, cardTypeData: {requestPending: true}};
        case READ_CARD_TYPES_FAILURE:
            return {...state, cardTypeData:{requestFailed: true}};
        default:
                return state;
        }
    }