import { getCommentUser } from "../../store/users"
import { getCurrentUser } from "../../store/session"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from '../CommentForm'

const Comment = ({ comment, question }) => {
  const dispatch = useDispatch();
  const author = useSelector(getCommentUser(comment))
  const currentUser = useSelector(getCurrentUser())
  const [renderForm, setRenderForm] = useState(false)

  // Checks if the currentUser is the author of the comment
  const isAuthor = () => {
    if (!comment) {
      return false;
    }
    if (comment.authorId === currentUser.id) {
      return true;
    }
  }

  // Renders the Comment form if current user is the author of the comment
  // and the edit comment button was clicked
  const renderCommentForm = () => {
    if (isAuthor() && renderForm) {
      return <CommentForm oldComment={comment}/>
    } else if (!comment) {
      // Renders the comment form for creation
      return <CommentForm question={question}/>
    }
  }


  return (
  <>
      <li>
        <p>{comment ? comment.body : ""}</p>
        <p>{comment ? author.username : ""}</p>
        {renderCommentForm()}
        {isAuthor() ? <button onClick={() => setRenderForm(!renderForm)}>Edit Comment</button>: null}
      </li>
  </>
  )
}

export default Comment;
