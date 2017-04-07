import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Message from './Message';

const Messages = ({ messages }) => (
  <ul className="message-list col-xs-12">
    {messages.map(message => <Message key={message.key} message={message} />)}
  </ul>
);

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  messages: state.messages
});

export default connect(mapStateToProps)(Messages);
