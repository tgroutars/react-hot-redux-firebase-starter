import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import trim from 'lodash.trim';

import { joinRoom, leaveRoom, sendMessage } from '../../actions/chatActions';
import Messages from './Messages';

class ChatPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: ''
    };

    this.onMessageChange = this.onMessageChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.props.actions.joinRoom();
  }

  componentWillUnmount() {
    this.props.actions.leaveRoom();
  }

  onMessageChange(evt) {
    this.setState({ message: evt.target.value });
  }

  onSend(evt) {
    evt.preventDefault();

    const message = trim(this.state.message);
    if (!message) {
      return;
    }
    this.props.actions.sendMessage(message);
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;

    return (
      <div className="chat-page">
        <Messages />
        <div className="chat-page__message-box">
          <textarea className="form-control" onChange={this.onMessageChange} placeholder="Write your message..." value={message} />
          <button className="btn btn-default" onClick={this.onSend}>Submit</button>
        </div>
      </div>
    );
  }
}

ChatPage.propTypes = {
  actions: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ leaveRoom, joinRoom, sendMessage }, dispatch)
});

export default connect(null, mapDispatchToProps)(ChatPage);
