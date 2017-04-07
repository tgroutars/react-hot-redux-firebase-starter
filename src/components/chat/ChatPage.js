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
    const { actions, params: { id } } = this.props;
    actions.joinRoom(id);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, params: { id } } = this.props;
    const { params: { id: nextId } } = nextProps;

    if (nextId !== id) {
      actions.leaveRoom(id);
      actions.joinRoom(nextId);
    }
  }

  componentWillUnmount() {
    const { actions, params: { id } } = this.props;
    actions.leaveRoom(id);
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
    const { actions, params: { id } } = this.props;
    actions.sendMessage(id, message);
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;

    return (
      <div className="chat-page">
        <div className="chat-page__message-box">
          <div className="col-xs-8">
            <textarea className="form-control" onChange={this.onMessageChange} placeholder="Write your message..." value={message} />
          </div>
          <div className="col-xs-4">
            <button className="btn btn-default" onClick={this.onSend}>Submit</button>
          </div>
        </div>
        <Messages />
      </div>
    );
  }
}

ChatPage.propTypes = {
  actions: PropTypes.object.isRequired,
  params: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired
  }).isRequired
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ leaveRoom, joinRoom, sendMessage }, dispatch)
});

export default connect(null, mapDispatchToProps)(ChatPage);
