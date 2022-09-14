import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import './LoginForm.css'
import { Redirect } from 'react-router-dom';
import '../Navigation/Navigation.scss'

const LoginFormPage = props => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const demoLogin = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
  }

  return (
    <div id="loginPage">
    <i class="fa-brands fa-stack-overflow"></i>
    <form className={'loginForm'} onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        <p>Email</p>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button id={'submitButton'} type="submit">Log In</button>
    </form>
    <button id={'demoSubmitButton'} onClick={demoLogin}>Demo User</button>

    </div>
  )
}

export default LoginFormPage;
