import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function roomsReducer(state = initialState.rooms, action) {
  switch (action.type) {
    case types.SET_ROOMS:
      return action.rooms;
    case types.ADD_ROOM:
      return [
        action.room,
        ...state
      ];
    default:
      return state;
  }
}
