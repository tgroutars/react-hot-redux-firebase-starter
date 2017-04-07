import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.SET_MESSAGES:
      return [...action.messages].reverse();
    case types.ADD_MESSAGE:
      return [
        action.message,
        ...state
      ];
    default:
      return state;
  }
}
