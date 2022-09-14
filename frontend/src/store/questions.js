import csrfFetch from './csrf';

export const RECEIVE_QUESTIONS = "questions/RECEIVE_QUESTIONS"
export const RECEIVE_QUESTION = "question/RECEIVE_QUESTION"
export const REMOVE_QUESTION = "question/REMOVE_REPORT"

// Selectors
export const getQuestions = state => {
  if (!state || !state.entities) {
    return []
  } else {
    return state.entities.questions
  }
}

export const getQuestion = questionId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.questions) {
    return null;
  } else {
    return state.entities.questions[questionId];
  }
}

// Actions
export const fetch_question = payload => {
  return {
    type: RECEIVE_QUESTION,
    payload 
  }
}
export const fetched_questions = (payload) => {
  return {
    type: RECEIVE_QUESTIONS,
    payload: payload 
  }
}

// Thunk actions
export const fetchQuestion = questionId => async dispatch => {
  const res = await fetch(`/api/questions/${questionId}`);
  const data = await res.json();

  return dispatch(fetch_question(data))
}

export const fetchQuestions = () => async (dispatch) => {
  const res = await csrfFetch("/api/questions");
  const data = await res.json();

  dispatch(fetched_questions(data))
}

export const createQuestion = questionData => async dispatch => {
  const res = await csrfFetch('/api/questions', {
    method: 'POST',
    body: JSON.stringify(questionData),
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    }
  });

  const data = await res.json();
  dispatch({type: RECEIVE_QUESTION, payload: data});
  return {res, data};
}

export const updateQuestion = questionData => async dispatch => {
  const res = await csrfFetch(`/api/questions/${questionData.id}`, {
    method: 'PATCH',
    body: JSON.stringify(questionData),
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    }
  });

  const data = await res.json();
  dispatch({type: RECEIVE_QUESTION, payload: data});
  return res
}

export const deleteQuestion = questionId => async dispatch => {
  const res = await csrfFetch(`/api/questions/${questionId}`, {
    method: 'DELETE'
  })

  dispatch({ type: REMOVE_QUESTION, payload: questionId})
}

const questionReducer = ( state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.payload.questions};
    case RECEIVE_QUESTION:
      newState[action.payload.question.id] = action.payload.question
      return newState;
    case REMOVE_QUESTION:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default questionReducer;
