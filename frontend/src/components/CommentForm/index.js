import { useState, useEffect } from 'react';
import { useParams, Redirect, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/session';
import { createComment, updateComment } from '../../store/comments'
import './CommentForm.scss'

const CommentForm = ({ oldComment, question, answer }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  let currentUser = useSelector(getCurrentUser());

  let type = "Edit"
  if (!oldComment) type = "Create Comment"
  let typeText = ""
  if (type === "Create Comment") {
    typeText = "Post Comment"
  } else {
    typeText = "Save Edits"
  }

  let commentData = { 
    author_id: currentUser.id,
    body: ""
  }

  // Insert question or answer id
  if (question) {
    commentData.questionId = question.id
  }

  if (answer) {
    commentData.answerId = answer.id
  }

  if (oldComment) {
    commentData.body = oldComment.body;
    commentData.id = oldComment.id
  }

  const [comment, setComment] = useState(commentData);

  const handleSubmit = async (e) => {
    if (type === "Create Comment") {
     
      const resNData = await dispatch(createComment(comment))
      const res = resNData.res;
      const data = resNData.data;
      if (res.ok === true) {
      }
    } else {
      dispatch(updateComment(comment))

    }
  }

  return (
    <div>
      <form id="commentForm" onSubmit={handleSubmit}>
        <label>Your Comment</label>
        <textarea value={comment.body} onChange={e => setComment({...comment, body: e.target.value})} maxLength="1000"/>
        <input id="createCommentButton" type={'submit'} value={typeText}/>
      </form>
    </div>
  )
}

export default CommentForm
