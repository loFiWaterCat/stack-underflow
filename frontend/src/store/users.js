import csrfFetch from './csrf';
import { RECEIVE_QUESTION, RECEIVE_QUESTIONS } from './questions'

export const getQuestionUser = question => state => {
  if (!state) {
    return null;
  } else if (!state.entities.users) {
    return null;
  } else {
    const authorId = state.entities.questions[question.id].authorId
    return state.entities.users[authorId]
  }
}

export const getAnswerUser = answer => state => {
  if (!state) {
    return null;
  } else if (!state.entities.users) {
    return null;
  } else {
    const authorId = state.entities.answers[answer.id].authorId
    return state.entities.users[authorId]
  }
}

export const getCommentUser = comment => state => {
  if (!state) {
    return null;
  } else if (!state.entities.users) {
    return null;
  } else {
    const authorId = state.entities.comments[comment.id].authorId
    return state.entities.users[authorId]
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
