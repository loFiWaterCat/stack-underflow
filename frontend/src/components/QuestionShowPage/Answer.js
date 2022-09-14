import AnswerForm from '../AnswerForm'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteAnswer } from '../../store/answers'
import { getAnswerUser } from '../../store/users'
import { getCurrentUser } from '../../store/session'

const Answer = ({ question, answer }) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(false)


  const author = useSelector(getAnswerUser(answer));
  const currentUser = useSelector(getCurrentUser());

  // Formatting time
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

  if (!answer) {
    return null
  }

  const toggleForm = e => {
    setForm(!form)
  }

  const deleteAnswerClick = e => {
    dispatch(deleteAnswer(answer.id))
  }

  // Conditionally render the edit form as needed
  if (answer.authorId !== currentUser.id) {
    return (
      <div className="answer">
        <p className="answerBody">{answer.body}</p>
        <div className="answerBottomB">
          <div id="dateName">
          <p>{updatedAtFinal}</p>
          <p>{author.username}</p>
          </div>
        </div>
      </div>
    )
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
        <div className="answerBottom">
          <div className="answerBottomLinks">
            <a onClick={toggleForm}>Edit</a>
            <a onClick={deleteAnswerClick}>Delete</a>
          </div>
            <div id="dateName">
              <p>{updatedAtFinal}</p>
              <p>{author.username}</p>
            </div>
        </div>
      </div>
    )
  }


}

export default Answer;
