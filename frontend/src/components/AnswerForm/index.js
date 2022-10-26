import { useState, useEffect } from 'react';
import { useParams, Redirect, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/session';
import { createAnswer, updateAnswer } from '../../store/answers'
import './AnswerForm.scss'

const AnswerForm = ({ question, resultAnswer }) => {
  const dispatch = useDispatch();
  const questionId = question.id;
  const [errors, setErrors] = useState([]);

  let currentUser = useSelector(getCurrentUser());

  let type = "Edit Answer"
  if (!resultAnswer) type = "Create Answer"
  let typeText = ""
  if (type === "Create Answer") {
    typeText = "Post Your Answer"
  } else {
    typeText = "Save Edits"
  }

  let answerData = {id: "", questionId: question.id, authorId: currentUser.id, body: ""};
  if (resultAnswer) {
    answerData.body = resultAnswer.body;
    answerData.id = resultAnswer.id;
  }

  const [answer, setAnswer] = useState(answerData);
  const [answerLength, setAnswerLength] = useState(answer.body.length)
  const [valid, setValid] = useState(false)

  const updateAnswerBody = e => {
    setAnswer({ ...answer, title: e.target.value });
    setAnswerLength(e.target.value.length)
    if (answerLength >= 1 && answerLength <= 30000) {
      setValid(true)
    } else {
      setValid(false)
    }
  }


  const handleSubmit = (e) => {
    if (type === "Create Answer") {
      const resNData = dispatch(createAnswer(answer))
      const res = resNData.res;
      const data = resNData.data;
      if (res.ok === true) {

      }
    } else {
      dispatch(updateAnswer(answer))
    }
  }

  return (
    <div>
      <form id="answerForm" onSubmit={handleSubmit}>
        <label>Your Answer</label>
        <textarea maxLength="30000" value={answer.body} onChange={updateAnswerBody} />
        <input id="createAnswerButton" type={'submit'} value={typeText} disabled={!valid}/>
      </form>
    </div>
  )

}

export default AnswerForm;
