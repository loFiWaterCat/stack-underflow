import csrfFetch from './csrf';
import { RECEIVE_QUESTION } from './questions.js'

const RECEIVE_VOTE = '/api/votes/RECEIVE_VOTE'
const REMOVE_VOTE = '/api/votes/REMOVE_VOTE'

// Selectors for votes
export const getQuestionVotes = questionId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.votes) {
    return null;
  } else if (Object.values(state.entities.votes).length === 0) {
    return {};
  } else {
    // Find the related vote, iterate through the vote in the store
    const relatedVotes = {}
    for (const [ind, vote] of Object.entries(state.entities.votes)) {
      if (vote.questionId == questionId) {
        relatedVotes[ind] = vote;
      }
    }
    
    return relatedVotes;
  }
}

export const getAnswerVotes = answers => state => {
  if (!state) {
    return null;
  } else if (!state.entities.votes) {
    return null;
  } else if (Object.values(state.entities.votes).length === 0) {
    return {};
  } else {
    const answerVotes = {}
    const answerKeys = Object.keys(answers)
    const newAnswerKeys = [];
    const length = answerKeys.length
    for (let i = 0; i < length; i++) {
      newAnswerKeys.push(parseInt(answerKeys[i]))
    }
    for (const [ind, vote] of Object.entries(state.entities.votes)) {
      if (newAnswerKeys.includes(vote.answerId)) {
        answerVotes[ind] = vote
      }
    }

    return answerVotes;
  }
}


export const createVote = vote => async dispatch => {
  const res = await csrfFetch('/api/votes', {
    method: 'POST',
    body: JSON.stringify(vote),
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    }
  });

  const data = await res.json();
  dispatch({type: RECEIVE_VOTE, payload: data});
}

export const updateVote = vote => async dispatch => {
  const res = await csrfFetch(`/api/votes/${vote.id}`, {
    method: 'PATCH',
    body: JSON.stringify(vote),
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    }
  });

  const data = await res.json();
  dispatch({type: RECEIVE_VOTE, payload: data});
}


export const deleteVote = voteId => async dispatch => {
  const res = await csrfFetch(`/api/votes/${voteId}`, {
    method: 'DELETE',
  })

  const data = await res.json();
  dispatch({ type: REMOVE_VOTE, payload: voteId })
}

// Reducer
const voteReducer = ( state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_QUESTION:
      return { ...newState, ...action.payload.votes }
    case RECEIVE_VOTE:
      newState[action.payload.id] = action.payload;
      return newState
    case REMOVE_VOTE:
      delete newState[action.payload]
      return newState
    default:
      return state;
  }
}

export default voteReducer;
