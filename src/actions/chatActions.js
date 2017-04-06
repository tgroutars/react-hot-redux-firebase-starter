import * as firebase from 'firebase/firebase-browser';

import { beginAjaxCall } from './ajaxStatusActions';
import * as types from './actionTypes';

export function addMessage(message) {
  const { author, createdAt, text } = message.val();
  const key = message.key;

  return {
    type: types.ADD_MESSAGE,
    message: {
      key,
      author,
      createdAt,
      text
    }
  };
}

export function fetchMessages() {
  return (dispatch) => {
    dispatch(beginAjaxCall);

    // TODO: sort messages
    // TODO: fetch only last 10
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('child_added', data => dispatch(addMessage(data)));
  };
}

export function sendMessage(text) {
  return (dispatch) => {
    dispatch(beginAjaxCall);

    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    const newMessageRef = firebase.database().ref('messages').push();
    newMessageRef.set({
      text,
      author: user && user.uid,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
  };
}
