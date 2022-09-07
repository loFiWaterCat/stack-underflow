import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <ul className={'sessionLinks'}>
          <button id={"loginButton"}><NavLink id={"loginText"} to="/login">Log In</NavLink></button>
          <button id={"signupButton"}><NavLink id={"signupText"} to="/signup">Sign Up</NavLink></button>
        </ul>
      </>
    );
  }

  return (
    <>
      <div id={'banner'}></div>
      <ul className={'navbar'}>
        <li>
          <NavLink id='home' exact to="/"><i class="fa-brands fa-stack-overflow"></i>stack<span>underflow</span></NavLink>
          {sessionLinks}
        </li>
      </ul>
    </>
  );
}

export default Navigation;
