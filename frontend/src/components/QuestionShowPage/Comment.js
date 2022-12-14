import { getCommentUser } from "../../store/users"
import { getCurrentUser } from "../../store/session"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/comments';
import CommentForm from '../CommentForm'
import './Comment.scss'

const Comment = ({ comment, question, answer }) => {
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
      return <CommentForm question={question} answer={answer}/>
    }
  }

  const deleteCommentClick = e => {
    dispatch(deleteComment(comment.id))
  }


  return (
    <>
      <li className="comment">
        <div className="comment-contents">
          <p>{comment ? comment.body + " - " +  author.username  : ""}</p>
        </div>
        {renderCommentForm()}
        <div className="comment-links">
          {isAuthor() ? <a onClick={() => setRenderForm(!renderForm)}>Edit</a> : null}
          {isAuthor() ? <a onClick={deleteCommentClick}>Delete</a> : null}
        </div>
      </li>
    </>
  )
}

export default Comment;
