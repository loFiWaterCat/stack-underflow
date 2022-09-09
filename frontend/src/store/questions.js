import csrfFetch from './csrf';

const RECEIVE_QUESTIONS = "questions/RECEIVE_QUESTIONS"
export const RECEIVE_QUESTION = "question/RECEIVE_QUESTION"

// Selectors
export const getQuestions = state => {
  if (!state.entities.questions) {
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
export const fetched_questions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    payload: questions
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

const questionReducer = ( state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.payload;
    case RECEIVE_QUESTION:
      newState[action.payload.question.id] = action.payload.question
      return newState;
    default:
      return state;
  }
}

export default questionReducer;
