import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roomUsersReducer(state = initialState.roomUsers, action) {
  switch (action.type) {
    case types.SET_ROOM_USERS:
      return action.emails;
    case types.ADD_ROOM_USER:
      return [
        action.email,
        ...state
      ];
    case types.REMOVE_ROOM_USER:
      if (state.indexOf(action.email)) {
        return state.filter(email => email !== action.email);
      }
      return state;
    default:
      return state;
  }
}
