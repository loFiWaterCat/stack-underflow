import csrfFetch from './csrf';
import { RECEIVE_QUESTION } from './questions.js'

const REMOVE_ANSWER = '/api/questions/REMOVE_ANSWER'

// Selectors
export const getQuestionAnswers = questionId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.answers) {
    return null;
  } else {
    // Find the related answers, iterate through the answers in the store
    const relatedAnswers = {}
    for (const [ind, answer] of Object.entries(state.entities.answers)) {
      if (answer.questionId == questionId) {
        relatedAnswers[ind] = answer;
      }
    }
    
    // return state.entities.answers;
    return relatedAnswers;
  }
}

export const createAnswer = answerData => async dispatch => {
  const res = await csrfFetch('/api/answers', {
    method: 'POST',
    body: JSON.stringify(answerData),
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    }
  });

  const data = await res.json();
  dispatch({type: RECEIVE_QUESTION, payload: data});
  return {res, data};
}

export const updateAnswer = answerData => async dispatch => {
  const res = await csrfFetch(`/api/answers/${answerData.id}`, {
    method: 'PATCH',
    body: JSON.stringify(answerData),
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    }
  })
  
  const data = await res.json();
  dispatch({type: RECEIVE_QUESTION, payload: data})
}

export const deleteAnswer = answerId => async dispatch => {
  const res = await csrfFetch(`/api/answers/${answerId}`, {
    method: 'DELETE',
  })

  const data = await res.json();
  dispatch({ type: REMOVE_ANSWER , payload: answerId})
}

// Reducer
const answerReducer = ( state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_QUESTION:
      return { ...newState, ...action.payload.answers };
    case REMOVE_ANSWER:
      console.log(action.payload)
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default answerReducer;
