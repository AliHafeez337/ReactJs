import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/auth-Context';

const Navigation = () => {

  const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <button onClick={authCtx.logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
