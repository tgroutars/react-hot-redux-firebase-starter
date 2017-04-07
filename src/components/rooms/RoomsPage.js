import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import trim from 'lodash.trim';

import { createRoom, joinRooms, leaveRooms } from '../../actions/roomActions';

class RoomsPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    this.props.actions.joinRooms();
  }

  componentWillUnmount() {
    this.props.actions.leaveRooms();
  }

  onNameChange(evt) {
    this.setState({ name: evt.target.value });
  }

  onCreate(evt) {
    evt.preventDefault();

    const name = trim(this.state.name);
    if (!name) {
      return;
    }
    const { actions } = this.props;
    actions.createRoom(name);
    this.setState({ name: '' });
  }

  render() {
    const { rooms } = this.props;
    const { name } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-xs-8">
            <textarea className="form-control" onChange={this.onNameChange} placeholder="Create a chat room" value={name} />
          </div>
          <div className="col-xs-4">
            <button className="btn btn-primary" onClick={this.onCreate}>Create</button>
          </div>
        </div>
        <ul className="rooms-page row">
          {rooms.map(room => (
            <li className="rooms-page__room" key={room.key}>
              <Link to={`chats/${room.key}`}>{room.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

RoomsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  rooms: state.rooms
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ createRoom, joinRooms, leaveRooms }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
