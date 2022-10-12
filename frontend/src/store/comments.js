import csrfFetch from './csrf';
import { RECEIVE_QUESTION } from './question.js'

const REMOVE_COMMENT = '/api/questions/REMOVE_COMMENT'

// TODO: Selectors

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

const commentReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_QUESTION:
      return { ...newState, ...action.payload.comments };
    default:
      return state;
  }
}

export default commentReducer;
