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

export function joinRoom(id) {
  return (dispatch) => {
    dispatch(setMessages([]));

    dispatch(beginAjaxCall);

    const messagesRef = firebase.database().ref('roomMessages/' + id)
      .orderByChild('createdAt')
      .limitToLast(10);
    messagesRef.on('child_added', messageSnapshot => {
      dispatch(addMessage(getRawMessage(messageSnapshot)));
    });
  };
}

export function leaveRoom(id) {
  return (dispatch) => {
    dispatch(setMessages([]));
    firebase.database().ref('roomMessages/' + id).off('child_added');
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
