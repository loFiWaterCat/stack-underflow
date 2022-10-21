import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
    <div id={'signupPage'}>
    <div id={'signupBlurb'}>
      <h2>Join the Stack Underflow community</h2>
      <p><i className="fa-regular fa-circle-question"></i> Get unstuck - ask a question</p>
      <p> <i className="fa-solid fa-arrow-up"></i> Unlock new priveleges like voting and commenting </p>
      <p><i className="fa-solid fa-tags"></i> Save your favorite tags, filters, and jobs</p>
      <p><i className="fa-solid fa-trophy"></i> Earn reputation and badges </p>
    </div>
    <form className={"signupForm"} onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        <p>Display Name</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <label>
        <p>Confirm Password</p>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button id={'submitButton'} type="submit">Sign Up</button>
    </form>
    </div>
    </>
  );
}

export default SignupFormPage;
