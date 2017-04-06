import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Messages = ({ messages }) => (
  <div className="chat-page__message-list">
    {messages.map(message => <div key={message.key}>{message.text}</div>)}
  </div>
);

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  messages: state.messages
});

export default connect(mapStateToProps)(Messages);
