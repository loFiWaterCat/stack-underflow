import { useEffect } from 'react';
import { getQuestions, fetchQuestions } from '../../store/questions.js'
import { useDispatch, useSelector } from "react-redux";
import QuestionIndex from '../QuestionIndex'
import FILLER from '../FILLER'
import './HomePage.scss'

const HomePage = () => {
  const dispatch = useDispatch();
  return (
    <div id='homePage'>
      <QuestionIndex />
    </div>
  );
}

export default HomePage;
