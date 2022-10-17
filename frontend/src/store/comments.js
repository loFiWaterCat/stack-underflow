import csrfFetch from './csrf';
import { RECEIVE_QUESTION } from './questions'

const REMOVE_COMMENT = '/api/questions/REMOVE_COMMENT'

// TODO: Selectors
export const getQuestionComments = questionId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.comments) {
    return null;
  } else {
    const relatedComments = {} 
    for (const [ind, comment] of Object.entries(state.entities.comments)) {
      if (comment.questionId == questionId) {
        relatedComments[ind] = comment;
      }
    }

    return relatedComments;
  }
}

export const getAnswerComments = answerId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.comments) {
    return null;
  } else {
    const relatedComments = {}
    for (const [ind, comment] of Object.entries(state.entities.comments)) {
      if (comment.answerId == answerId) {
        relatedComments[ind] = comment;
      }
    }

    return relatedComments
  }
}

export const createComment = commentData => async dispatch => {
  const res = await csrfFetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(commentData),
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    }
  })

  const data = await res.json();
  dispatch({type: RECEIVE_QUESTION, payload: data});
  return {res, data};
}

export const updateComment = commentData => async dispatch => {
  const res = await csrfFetch(`/api/comments/${commentData.id}`, {
    method: 'PATCH',
    body: JSON.stringify(commentData),
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    }
  })

  const data = await res.json()
  dispatch({type: RECEIVE_QUESTION, payload: data})
}

export const deleteComment = commentId => async dispatch => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  })

  const data = await res.json();
  dispatch({ type: REMOVE_COMMENT, payload: commentId})
}

const commentReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_QUESTION:
      return { ...newState, ...action.payload.comments };
    case REMOVE_COMMENT:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default commentReducer;
