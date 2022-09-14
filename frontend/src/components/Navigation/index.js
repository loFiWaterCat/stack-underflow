import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.scss';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let history = useHistory();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <ul className={'sessionLinks'}>
          <button id={"loginButton"} onClick={() => history.push('/login')} >Log In</button>
          <button id={"signupButton"} onClick={() => history.push('/signup')}>Sign Up</button>
        </ul>
      </>
    );
  }

  return (
    <>
      <div id="navbar">
        <div id={'banner'}></div>
        <ul >
          <li id='homeContainer'>
            <NavLink id='home' exact to="/"><i className="fa-brands fa-stack-overflow"></i><p>stack<span>underflow</span></p></NavLink>
          </li>
            <div id='sessionLinks'>
              {sessionLinks}
            </div>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
