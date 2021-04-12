import { combineReducers } from 'redux';

import {SET_USER} from './actions';

function currentUserReducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return {
                username: action.data.username,
                userID: action.data.userID
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    currUser: currentUserReducer
  });
  export default rootReducer;