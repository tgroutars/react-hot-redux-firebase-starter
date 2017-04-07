import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import LoginLink from './LoginLink';
import LogoutLink from './LogoutLink';
import AdminLink from './AdminLink';

const Header = ({signOut, auth, user}) => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <IndexLink className="navbar-brand" to="/">ChatX</IndexLink>
        </div>
        <div>
          <ul className="nav navbar-nav">
            {auth.isLogged ? <li><LogoutLink signOut={signOut} /></li> : null}
            {!auth.isLogged ? <li><Link to="/register">Sign Up</Link></li> : null}
            {!auth.isLogged ? <li><Link to="/login">Login</Link></li> : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  signOut: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

export default Header;
