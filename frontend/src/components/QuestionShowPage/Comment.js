import { getCommentUser } from "../../store/users"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const author = useSelector(getCommentUser(comment))

  return (
  <>
      <li>
        <p>{comment.body}</p>
        <p>{author.username}</p>
      </li>
  </>
  )
}

export default Comment;
