import { getQuestion, fetchQuestion } from '../../store/questions.js'
import { getQuestionAnswers } from '../../store/answers.js'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import QuestionShow from './QuestionShow.js'
import './QuestionShowPage.css'
import ErrorPage from "../ErrorPage"

const QuestionShowPage = () => {
  const dispatch = useDispatch();
  const { questionId } = useParams();

  useEffect( () => {
    dispatch(fetchQuestion(questionId))
  }, [questionId])

  const question = useSelector(getQuestion(questionId));
  const answers = useSelector(getQuestionAnswers(questionId));

  if (!question) return null;

  return (
    <div id='questionShowPage'>
      <QuestionShow question={question} answers={answers}/>
    </div>
  )
}

export default QuestionShowPage;
