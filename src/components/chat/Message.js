import React, { PropTypes } from 'react';

const Message = ({ message: { author, text } }) => (
  <div>
    <div className="message-header">{author}</div>
    <div className="message-text">{text}</div>
  </div>
);

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
