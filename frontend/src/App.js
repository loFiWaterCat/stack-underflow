import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import FILLER from "./components/FILLER";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import Splash from "./components/Splash";

function App() {
  const sessionUser = useSelector(state => state.session.user);

  const rootPage = () => {
    if (sessionUser) {
      return <HomePage />;
    } else {
      return <Splash />;
    }
  }

  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            {rootPage}
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
