import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { deleteQuestion } from '../../store/questions'
import Answer from './Answer'

const QuestionShow = ({ question, answers }) => {
  const dispatch = useDispatch();

  let answerArray = Object.values(answers);
  const history = useHistory();

  useEffect(() => {
    return
  }, [answerArray])

  // Count of the answers
  const numAnswers = answerArray.length
  let numAnswersText = "Answer"
  if (numAnswers > 1) {
    numAnswersText = "Answers"
  }

  const handleClick = e => {
    dispatch(deleteQuestion(question.id));
  }

  return (
    <>
    <div id="titleNButton">
      <h2 id='questionTitle'>{question.title}</h2>
      <button id="askQuestionButton" onClick={() => history.push("/questions/ask")}>Ask Question</button>
    </div>
    <div>
      <p id='questionBody'> {question.body}</p>
        <div id='bottomOfQuestion'>
          <div id="extralinks">
              <Link to={`/questions/${question.id}/edit`}>Edit</Link>
              <Link to={`/`} onClick={handleClick} >Delete</Link>
          </div>
          <p>PUT AUTHOR INFO HERE</p>
        </div>
      <p id='answerCount'> {numAnswers} {numAnswersText}</p>
      <ul>
        { answerArray.map( answer => {
              return <Answer key={answer.id} question={question} answer={answer} />
              })
        }
      </ul>
    </div>
    </>
  )
}

export default QuestionShow;
