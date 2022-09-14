import csrfFetch from './csrf';
import { RECEIVE_QUESTION, RECEIVE_QUESTIONS } from './questions'

export const getQuestionUser = questionId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.users) {
    return null;
  } else {
    const authorId = state.entities.questions[questionId]
    return state.entites.users[authorId]
  }
}

export const getAnswerUser = answerId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.users) {
    return null;
  } else {
    const authorId = state.entities.questions[answerId]
    return state.entites.users[authorId]
  }
}

const  userReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_QUESTION:
      return { ...newState, ...action.payload.users }
    case RECEIVE_QUESTIONS:
      return { ...newState, ...action.payload.users }
    default:
      return state
  }
}

export default userReducer;
