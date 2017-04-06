import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.ADD_MESSAGE:
      // TODO: keep messages sorted
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
}
