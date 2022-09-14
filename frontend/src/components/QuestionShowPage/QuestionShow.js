import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { deleteQuestion } from '../../store/questions'
import { getQuestionUser } from '../../store/users'
import { getCurrentUser } from '../../store/session'
import Answer from './Answer'

const QuestionShow = ({ question, answers }) => {
  const dispatch = useDispatch();

  let answerArray = Object.values(answers);
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser());

  useEffect(() => {
    return
  }, [answerArray])

  // Count of the answers
  let numAnswers = answerArray.length
  let numAnswersText = "Answer"
  if (numAnswers > 1) {
    numAnswersText = "Answers"
  } else if (numAnswers === 0) {
    numAnswersText = ""
  }

  const user = useSelector(getQuestionUser(question))

  // Formatting the time
  let createdAt = (question.createdAt).split('-')
  createdAt[2] = createdAt[2].split('T')
  createdAt = createdAt.flat()
  createdAt[3] = createdAt[3].slice(0, 5)
  const createdAtFinal = createdAt[1].concat("/").concat(createdAt[2]).concat("/").concat(createdAt[0]).concat(" ").concat(createdAt[3])

  let updatedAt = (question.updatedAt).split('-')
  updatedAt[2] = updatedAt[2].split('T')
  updatedAt = updatedAt.flat()
  updatedAt[3] = updatedAt[3].slice(0, 5)
  const updatedAtFinal = updatedAt[1].concat("/").concat(updatedAt[2]).concat("/").concat(updatedAt[0]).concat(" ").concat(updatedAt[3])

  console.log("createdAtFinal", createdAtFinal)
  console.log("Updated At", updatedAtFinal)

  if (numAnswers === 0) {
    numAnswers = ""
  }

  const handleClick = e => {
    dispatch(deleteQuestion(question.id));
  }


  if (currentUser.id !== question.authorId) {
    return (
    <>
    <div id="questionTop">
      <div id="titleNButton">
        <h2 id='questionTitle'>{question.title}</h2>
        <button id="askQuestionButton" onClick={() => history.push("/questions/ask")}>Ask Question</button>
      </div>
      <div id="date">
        <p><span>Asked</span> {createdAtFinal}</p>
        <p><span>Modified</span> {updatedAtFinal}</p>
      </div>
    </div>
    <div>
      <p id='questionBody'> {question.body}</p>
        <div id='bottomOfQuestion'>
          <div id="questionAuthorInfo">
            <p>{user.username}</p>
          </div>
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

  return (
    <>
    <div id="questionTop">
    <div id="titleNButton">
      <h2 id='questionTitle'>{question.title}</h2>
      <button id="askQuestionButton" onClick={() => history.push("/questions/ask")}>Ask Question</button>
    </div>
      <div id="date">
        <p><span>Asked</span> {createdAtFinal}</p>
        <p><span>Modified</span> {updatedAtFinal}</p>
      </div>
    </div>
    <div>
      <p id='questionBody'> {question.body}</p>
        <div id='bottomOfQuestion'>
          <div id="extralinks">
              <Link to={`/questions/${question.id}/edit`}>Edit</Link>
              <Link to={`/`} onClick={handleClick} >Delete</Link>
          </div>
          <div id="questionAuthorInfo">
            <p>{user.username}</p>
          </div>
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
