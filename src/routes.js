import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './components/Layout';
import ChatPage from './components/chat/ChatPage';
import RoomsPage from './components/rooms/RoomsPage';
import LoginPage from './components/login/LoginPage'; //eslint-disable-line import/no-named-as-default
import RegistrationPage from './components/registration/RegistrationPage'; //eslint-disable-line import/no-named-as-default


export default function Routes(store) {
  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={RoomsPage} />
      <Route path="chats/:id" component={ChatPage} />
      <Route path="register" component={RegistrationPage} />
      <Route path="login" component={LoginPage} />
    </Route>
  );
}
