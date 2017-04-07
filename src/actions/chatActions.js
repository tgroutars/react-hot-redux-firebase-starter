import * as firebase from 'firebase/firebase-browser';

import { beginAjaxCall } from './ajaxStatusActions';
import * as types from './actionTypes';

function getRawMessage(message) {
  const { author, createdAt, text } = message.val();
  const key = message.key;

  return {
    key,
    author,
    createdAt,
    text
  };
}

function getRawUser(roomUser) {
  const { email } = roomUser.val();
  const key = roomUser.key;

  return {
    key,
    email
  };
}

export function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function setMessages(messages) {
  return {
    type: types.SET_MESSAGES,
    messages
  };
}

export function addRoomUser(email) {
  return {
    type: types.ADD_ROOM_USER,
    email
  };
}

export function removeRoomUser(email) {
  return {
    type: types.REMOVE_ROOM_USER,
    email
  };
}

export function setRoomUsers(emails) {
  return {
    type: types.SET_ROOM_USERS,
    emails
  };
}

export function joinRoom(id) {
  return (dispatch) => {
    dispatch(setMessages([]));
    dispatch(setRoomUsers([]));

    dispatch(beginAjaxCall);

    const messagesRef = firebase.database().ref('roomMessages/' + id)
      .orderByChild('createdAt')
      .limitToLast(10);
    messagesRef.on('child_added', messageSnapshot => {
      dispatch(addMessage(getRawMessage(messageSnapshot)));
    });

    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }

    // Set user as present
    const userPresenceRef = firebase.database().ref('presence/' + id);
    const newUserPresenceRef = userPresenceRef.child(user.uid);

    userPresenceRef.on('child_added', roomUserSnapshot => {
      dispatch(addRoomUser(getRawUser(roomUserSnapshot).email));
    });

    userPresenceRef.on('child_removed', roomUserSnapshot => {
      dispatch(removeRoomUser(getRawUser(roomUserSnapshot).email));
    });

    newUserPresenceRef.onDisconnect().remove();

    newUserPresenceRef.set({
      email: user.email
    });
  };
}

export function leaveRoom(id) {
  return (dispatch) => {
    dispatch(setMessages([]));
    dispatch(setRoomUsers([]));
    firebase.database().ref('roomMessages/' + id).off('child_added');

    const userPresenceRef = firebase.database().ref('presence/' + id);
    userPresenceRef.off('child_added');
    userPresenceRef.off('child_removed');

    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    firebase.database().ref('roomMessages/' + id).off('child_added');
    firebase.database().ref('roomMessages/' + id).off('child_added');

    // Set user as absent
    firebase.database().ref('presence/' + id).child(user.uid).remove();
  };
}

export function sendMessage(id, text) {
  return (dispatch) => {
    dispatch(beginAjaxCall);

    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    const newMessageRef = firebase.database().ref('roomMessages/' + id).push();
    newMessageRef.set({
      text,
      author: user.email,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
  };
}
