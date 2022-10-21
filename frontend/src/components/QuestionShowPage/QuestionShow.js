import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteQuestion } from '../../store/questions'
import { getQuestionUser } from '../../store/users'
import { getCurrentUser } from '../../store/session'
import { createVote, deleteVote, updateVote } from '../../store/votes'
import { getQuestionComments } from '../../store/comments'
import Answer from './Answer'
import Comment from './Comment'

const QuestionShow = ({ question, answers, votes, answerVotes }) => {
  const dispatch = useDispatch();

  let answerArray = Object.values(answers);
  let questionComments = Object.values(useSelector(getQuestionComments(question.id)))
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser());
  const [voteTotal, setVoteTotal] = useState(0);
  const [createCommentForm, setCreateCommentForm] = useState(false)
  const [editCommentForm, setEditCommentForm] = useState(false)

  // Calculate vote total

  useEffect(() => {
    const calcVote = () => {
      let count = 0;
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

  // Count of the answers
  let numAnswers = answerArray.length
  let numAnswersText = "Answer"
  if (numAnswers > 1) {
    numAnswersText = "Answers"
  } else if (numAnswers === 0) {
    numAnswersText = ""
  }

  let user = useSelector(getQuestionUser(question))
  if (!user) {
    user = currentUser;
  }

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

  if (numAnswers === 0) {
    numAnswers = ""
  }

  const handleClick = e => {
    dispatch(deleteQuestion(question.id));
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
    let vote = {userId: currentUser.id, questionId: question.id, value: true}
    
    // Check if the user has already upvoted the question
    let alreadyVote = false;
    let valueHolder = true;
    for (const [ind, questionVote] of Object.entries(votes)) {
      if (questionVote.questionId === question.id && questionVote.userId === currentUser.id) {
        alreadyVote = true;
        vote.id = questionVote.id;
        valueHolder = questionVote.value;
      }
    }
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
    let vote = {userId: currentUser.id, questionId: question.id, value: false}
    
    // Check if the user has already upvoted the question
    let alreadyVote = false;
    let valueHolder = false;
    for (const [ind, questionVote] of Object.entries(votes)) {
      if (questionVote.questionId === question.id && questionVote.userId === currentUser.id) {
        alreadyVote = true;
        vote.id = questionVote.id;
        valueHolder = questionVote.value;
      }
    }
    if (!alreadyVote) {
      dispatch(createVote(vote))
    } else if (valueHolder === true) {
      dispatch(updateVote(vote))
    } else {
      // Delete the vote
      dispatch(deleteVote(vote.id))
    }
  }

  const toggleCreateCommentForm = e => {
    setCreateCommentForm(!createCommentForm)
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
        <div id="the-rest">
          <div id="voteNBody">
            <div className="vote">
              <button className={`upvote ${toggleColorUpvote}`} onClick={upvote} ></button>
              {voteTotal}
              <button className={`downvote ${toggleColorDownvote}`} onClick={downvote} ></button>
            </div>
            <p id='questionBody'> {question.body}</p>
          </div>
          <div id='bottomOfQuestion'>
            <div id="questionAuthorInfo">
              <p>{user.username}</p>
            </div>
          </div>
          <ul className="comment-list">
            {questionComments.map(comment => {
              return <Comment key={comment.id} comment={comment} />
            })}
          </ul>
          {createCommentForm ? <Comment question={question} /> : null}
            <a className="create-comment-question" onClick={toggleCreateCommentForm}>Create Comment</a>
          
            <p id='answerCount'> {numAnswers} {numAnswersText}</p>
          <ul>
            {answerArray.map(answer => {
              const answerRelatedVotes = []
              for (const [ind, answerVote] of Object.entries(answerVotes)) {
                if (answerVote.answerId === answer.id) {
                  answerRelatedVotes.push(answerVote)
                }
              }
              return (
                <Answer key={answer.id} question={question} answer={answer} votes={answerRelatedVotes} />
              )
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
        <div id="voteNBody">
          <div className="vote">
            <button className={`upvote ${toggleColorUpvote}`} onClick={upvote}></button>
            {voteTotal}
            <button className={`downvote ${toggleColorDownvote}`} onClick={downvote}></button>
          </div>
          <p id='questionBody'> {question.body}</p>
        </div>
        <div id='bottomOfQuestion'>
          <div id="extralinks">
            <Link to={`/questions/${question.id}/edit`}>Edit</Link>
            <Link to={`/`} onClick={handleClick} >Delete</Link>
          </div>
          <div id="questionAuthorInfo">
            <p>{user.username}</p>
          </div>
        </div>
        <ul className="comment-list">
          {questionComments.map(comment => {
            return <Comment key={comment.id} comment={comment} />
          })}
        </ul>
        {createCommentForm ? <Comment question={question} /> : null}
        <a className="create-comment" onClick={toggleCreateCommentForm}>Create Comment</a>

        <p id='answerCount'> {numAnswers} {numAnswersText}</p>
        <ul>
          {answerArray.map(answer => {
            const answerRelatedVotes = []
            for (const [ind, answerVote] of Object.entries(answerVotes)) {
              if (answerVote.answerId === answer.id) {
                answerRelatedVotes.push(answerVote)
              }
            }
            return <Answer key={answer.id} question={question} answer={answer} votes={answerRelatedVotes} />
          })
          }
        </ul>
      </div>
    </>
  )
}

export default QuestionShow;
