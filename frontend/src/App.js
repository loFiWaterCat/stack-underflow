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
import QuestionShowPage from "./components/QuestionShowPage"
import QuestionForm from "./components/QuestionForm"
import './container.scss'

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
      <div id="container">
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
          <Route exact path="/questions/ask">
            <QuestionForm />
          </Route>
          <Route exact path="/questions/:questionId/edit">
            <QuestionForm />
          </Route>
          <Route exact path="/questions/:questionId">
            <QuestionShowPage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </>
  );
}


export default App;
