import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Message from './Message';

const Messages = ({ messages }) => (
  <div className="message-list">
    {messages.map(message => <Message key={message.key} message={message} />)}
  </div>
);

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  messages: state.messages
});

export default connect(mapStateToProps)(Messages);
