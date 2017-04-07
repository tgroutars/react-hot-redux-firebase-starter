import * as firebase from 'firebase/firebase-browser';

import { beginAjaxCall } from './ajaxStatusActions';
import * as types from './actionTypes';

function getRawRoom(room) {
  const { name } = room.val();
  const key = room.key;

  return {
    key,
    name
  };
}

export function addRoom(room) {
  return {
    type: types.ADD_ROOM,
    room
  };
}

export function setRooms(rooms) {
  return {
    type: types.SET_ROOMS,
    rooms
  };
}

export function joinRooms() {
  return (dispatch) => {
    dispatch(setRooms([]));

    dispatch(beginAjaxCall);

    const roomsRef = firebase.database().ref('rooms');
    roomsRef.on('child_added', roomSnapshot => {
      dispatch(addRoom(getRawRoom(roomSnapshot)));
    });
  };
}

export function leaveRooms() {
  return (dispatch) => {
    dispatch(setRooms([]));
    firebase.database().ref('rooms').off('child_added');
  };
}
