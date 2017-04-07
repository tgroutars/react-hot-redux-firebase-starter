import React, { PropTypes } from 'react';

const Message = ({ message: { author, text } }) => (
  <li className="message">
    <div className="message-header">{author}</div>
    <div className="message-text">{text}</div>
  </li>
);

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
