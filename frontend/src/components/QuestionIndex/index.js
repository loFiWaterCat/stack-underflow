import QuestionItem from './QuestionItem'
import { useEffect } from 'react';
import { getQuestions, fetchQuestions } from '../../store/questions.js'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getQuestionUser } from "../../store/users"
import FILLER from "../FILLER"

const QuestionIndex = ( ) => {
  let history = useHistory();
  const dispatch = useDispatch();


  const questions = Object.values(useSelector(getQuestions));

  useEffect( () => {
    dispatch(fetchQuestions())
  }, [])

  const users = useSelector(state => {
    return state.entities.users
  })

  if (questions === null) {
    return null;
  }

  return (
    <div id='questionIndex'>
      <div id='questionIndexHead'>
        <h2 id='questionIndexHeader'>Top Questions</h2>
        <button id="askQuestionButton" onClick={() => history.push("/questions/ask")}>Ask Question</button>
      </div>
      <ul id='questionList'>
        {questions.map( question => {

          return <QuestionItem key={question.id} question={question} author={users[question.authorId]}/>
          })
        }
      </ul>
      
    </div>
  )
}

export default QuestionIndex;
