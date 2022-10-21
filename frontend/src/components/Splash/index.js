import React from 'react';
import { useHistory } from "react-router-dom";
import './Splash.scss'

const Splash = () => {
  const history = useHistory();

  const alreadyInButton = () => {
    return <button onClick={() => history.push("/login")} className="already-in-button">Already In?</button>
  }

  const joinCommunityButton = () => {
    return <button onClick={() => history.push("/signup")} className="join-button">Join the Community</button>
  }

  return (
    <div id="splash-page">
      <div className="orange-square" id="square-1">
      </div>
      <div className="blue-square" id="square-2">
      </div>
      <div className="blue-square" id="square-3">
      </div>
      <div id="part-one">
        <div id="part-one-top">
          <div id="left-top">
            <p>Find the best answer to your technical question, help others answers theirs</p>
            {joinCommunityButton()}
          </div>

          <div id="right-top">
            <p>Jump back in to finding the best answers for your questions</p>
            {alreadyInButton()}
          </div>
        </div>

        <p id="middle-blurb">Everyone needs some help
          <br/>
          <span id="orange-text">Don't go alone</span>
          <br/>
          And <span className="red-text">squash those bugs</span>
        </p>
          

        <div id="part-one-bottom">
          <div id="white-circle">
          </div>
          <div id="left-bottom">
            <p id="bottom-first">A public platform building the definitive
              collection of coding questions & answers</p>
            <p>A community-based space to find and contribute answers to technical
              challenges, and one of the most popular websites in the world.</p>
            {joinCommunityButton()}
          </div>

          <div id="right-bottom">
            <p id="bottom-first">
              Returning?
            </p>
              <p>
              Find all the answers to your questions from reputable users
              </p>
            {alreadyInButton()}
          </div>
        </div>
      </div>
      <div id="about-links">
      </div>
    </div>
  );
}

export default Splash;
