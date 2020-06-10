import React from 'react';
import { Link } from 'react-router-dom'
import './headerStyles.scss';
import { auth } from './../../firebase/utils'

const Header = props => {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/"><h4>Jared Kraus</h4></Link>
        </div>

        <div className="callToActions">

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}

          {currentUser && (
            <ul>
              <li>
                <a onClick={() => auth.signOut()} >
                  LogOut
                </a>
              </li>
            </ul>
          )}

        </div>

      </div>
    </header>
  );
}

Header.defaultProps = {
  currentUser: null
}

export default Header;
