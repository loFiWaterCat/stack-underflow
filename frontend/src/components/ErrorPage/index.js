import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <div id="errorPage">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <div id="errorMessage">
      <p>Page not found</p>
      <p>We're sorry, we couldn't find the page you requested</p> 
      <ul>
        <li>Try searching for similar questions</li>
        <li>Browse our recent questions</li>
        <li>Browse our popular tags</li>
        <li>If you feel something is missing that should be here, contact us</li>
      </ul>
    </div>

    </div>
  );
}

export default ErrorPage;
