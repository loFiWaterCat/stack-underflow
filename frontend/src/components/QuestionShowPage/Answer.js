import AnswerForm from '../AnswerForm'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteAnswer } from '../../store/answers'

const Answer = ({ question, answer }) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(false)

  if (!answer) {
    return null
  }

  const toggleForm = e => {
    setForm(!form)
  }

  const deleteAnswerClick = e => {
    dispatch(deleteAnswer(answer.id))
  }

  if (form) {
    return (
      <div className="answer">
        <AnswerForm question={question} resultAnswer={answer}/>

      </div>
    )
  } else {
    return (
      <div className="answer">
        <p className="answerBody">{answer.body}</p>
        <button onClick={toggleForm}>Edit</button>
        <button onClick={deleteAnswerClick}>Delete</button>
      </div>
    )
  }


}

export default Answer;
