import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { joinRooms, leaveRooms } from '../../actions/roomActions';

class RoomsPage extends Component {
  componentDidMount() {
    this.props.actions.joinRooms();
  }

  componentWillUnmount() {
    this.props.actions.leaveRooms();
  }

  render() {
    const { rooms } = this.props;

    return (
      <ul className="rooms-page">
        {rooms.map(room => (
          <li className="rooms-page__room" key={room.key}>
            <Link to={`chats/${room.key}`}>{room.name}</Link>
          </li>
        ))}
      </ul>
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
  actions: bindActionCreators({ joinRooms, leaveRooms }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
