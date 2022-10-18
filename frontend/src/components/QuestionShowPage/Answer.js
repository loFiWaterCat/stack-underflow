import AnswerForm from '../AnswerForm'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteAnswer } from '../../store/answers'
import { getAnswerUser } from '../../store/users'
import { getCurrentUser } from '../../store/session'
import { createVote, updateVote, deleteVote } from '../../store/votes'
import { getAnswerComments } from '../../store/comments'
import Comment from './Comment'

const Answer = ({ question, answer, votes }) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(false)
  const [createCommentForm, setCreateCommentForm] = useState(false)


  const author = useSelector(getAnswerUser(answer));
  const currentUser = useSelector(getCurrentUser());
  const answerComments = Object.values(useSelector(getAnswerComments(answer.id)))

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

  const [voteTotal, setVoteTotal] = useState(0);

  // Calculate vote total
  

  useEffect(() => {
    const calcVote = () => {
      let count = 0;
      if (!votes) {
        return null;
      }
      Object.values(votes).forEach(vote => {
        if (vote.value) {
          count += 1;
        } else {
          count -= 1;
        }
      })

      setVoteTotal(count)
    }

    calcVote();

  }, [votes])

  if (!answer) {
    return null
  }

  const toggleForm = e => {
    setForm(!form)
  }

  const toggleCreateCommentForm = e => {
    setCreateCommentForm(!createCommentForm)
  }

  const deleteAnswerClick = e => {
    dispatch(deleteAnswer(answer.id))
  }

  // Toggle color for arrows
  let toggleColorUpvote = "noColor";
  for (const [ind, vote] of Object.entries(votes)) {
    if (vote.userId === currentUser.id && vote.value === true) {
      toggleColorUpvote = "coloredUpvote";
    }
  }
  let toggleColorDownvote = "noColor";
  for (const [ind, vote] of Object.entries(votes)) {
    if (vote.userId === currentUser.id && vote.value === false) {
      toggleColorDownvote = "coloredDownvote";
    }
  }




  // Upvote
  const upvote = e => {
    let vote = {userId: currentUser.id, answerId: answer.id, value: true}
    
    // Check if the user has already upvoted the answer
    let alreadyVote = false;
    let valueHolder = true;
    console.log(votes)
    if (!votes) {
      return null;
    }
    votes.forEach(answerVote => {
      if (answerVote.answerId === answer.id && answerVote.userId === currentUser.id) {
        alreadyVote = true;
        vote.id = answerVote.id;
        valueHolder = answerVote.value;
      }
    })
    if (!alreadyVote) {
      dispatch(createVote(vote))
    } else if (valueHolder === false) {
      dispatch(updateVote(vote))
    } else {
      // Delete the vote
      dispatch(deleteVote(vote.id))
    }
  }
  
  // Downvote
    const downvote = e => {
    let vote = {userId: currentUser.id, answerId: answer.id, value: false}
    
    // Check if the user has already upvoted the answer
    let alreadyVote = false;
    let valueHolder = false ;
    votes.forEach(answerVote => {
      if (answerVote.answerId === answer.id && answerVote.userId === currentUser.id) {
        alreadyVote = true;
        vote.id = answerVote.id;
        valueHolder = answerVote.value;
      }
    })
    if (!alreadyVote) {
      dispatch(createVote(vote))
    } else if (valueHolder === true) {
      dispatch(updateVote(vote))
    } else {
      // Delete the vote
      dispatch(deleteVote(vote.id))
    }
  }



  // Conditionally render the edit form as needed
  if (answer.authorId !== currentUser.id) {
    return (
      <div className="answer">
        <div id="voteNBody">
          <div className="vote">
            <button className={`upvote ${toggleColorUpvote}`} onClick={upvote}></button>
            {voteTotal}
            <button className={`downvote ${toggleColorDownvote}`} onClick={downvote}></button>
          </div>
          <p className="answerBody" >{answer.body}</p>
        </div>
        <div className="answerBottomB">
          <div id="dateName">
            <p>{updatedAtFinal}</p>
            <p>{author.username}</p>
          </div>
        </div>
          <ul className="comment-list">
            {answerComments.map(comment => {
              return <Comment key={comment.id}  comment={comment} />
            })}
          </ul>
          {createCommentForm ? <Comment question={question} answer={answer}/> : null}
          <a className="create-comment" onClick={toggleCreateCommentForm}>Create Comment</a>
      </div>
    )
  }
  if (form) {
    return (
      <div className="answer">
        <AnswerForm question={question} resultAnswer={answer} />
      </div>
    )
  } else {
    return (
      <div className="answer">
        <div id="voteNBody">
          <div className="vote">
            <button className={`upvote ${toggleColorUpvote}`} onClick={upvote}></button>
            {voteTotal}
            <button className={`downvote ${toggleColorDownvote}`} onClick={downvote} ></button>
          </div>
          <p className="answerBody">{answer.body}</p>
        </div>
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
        <ul className="comment-list">
          {answerComments.map(comment => {
            return <Comment key={comment.id} comment={comment} />
          })}
        </ul>
        {createCommentForm ? <Comment question={question} answer={answer} /> : null}
        <a className="create-comment" onClick={toggleCreateCommentForm}>Create Comment</a>
      </div>
    )
  }


}

export default Answer;
