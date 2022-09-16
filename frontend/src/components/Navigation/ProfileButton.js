import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useParams, useHistory } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    history.push("/login")
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={logout} className="logoutButton">
        Log Out
      </button>
    </>
  );
}

export default ProfileButton;
      // <div class="dropdown">
      //   <button class="dropdownButton"><i class="fa-sharp fa-solid fa-bars"></i></button>
      //   <div class="dropdown-content">
      //     <a href="/logout">log out</a>
      //   </div>
      // </div>
