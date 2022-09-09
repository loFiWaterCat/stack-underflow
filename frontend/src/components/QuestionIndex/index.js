import QuestionItem from './QuestionItem'
import { useEffect } from 'react';
import { getQuestions, fetchQuestions } from '../../store/questions.js'
import { useDispatch, useSelector } from "react-redux";
import FILLER from "../FILLER"

const QuestionIndex = ( {questions }) => {

  if (questions === null) {
    return null;
  }

  return (
    <div id='questionIndex'>
      <h2 id='questionIndexHeader'>Top Questions</h2>
      <ul id='questionList'>
        {questions.map( question => {
          return <QuestionItem key={question.id} question={question}/>
          })
        }
      </ul>
      
    </div>
  )
}

export default QuestionIndex;
