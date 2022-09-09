import { useEffect } from 'react';
import { getQuestions, fetchQuestions } from '../../store/questions.js'
import { useDispatch, useSelector } from "react-redux";
import QuestionIndex from '../QuestionIndex'
import FILLER from '../FILLER'
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const questions = useSelector(getQuestions);

  useEffect( () => {
    dispatch(fetchQuestions())
  }, [])

  if (questions.questions === null) {
    return null;
  }

  return (
    <div id='homePage'>
      <QuestionIndex questions={Object.values(questions)} />
    </div>
  );
}

export default HomePage;
