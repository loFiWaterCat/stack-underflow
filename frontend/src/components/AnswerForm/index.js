import { useState, useEffect } from 'react';
import { useParams, Redirect, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion, updateQuestion} from '../../store/questions';
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
        <textarea value={answer.body} onChange={e => setAnswer({...answer, body: e.target.value})} />
        <input id="createAnswerButton" type={'submit'} value={typeText}/>
      </form>
    </div>
  )

}

export default AnswerForm;
