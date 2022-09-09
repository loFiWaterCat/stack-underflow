import csrfFetch from './csrf';
import { RECEIVE_QUESTION } from './questions.js'

// Selectors
export const getQuestionAnswers = questionId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.answers) {
    return null;
  } else {
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

// Reducer
const answerReducer = ( state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_QUESTION:
      return { ...newState, ...action.payload.answers };
    default:
      return state;
  }
}

export default answerReducer;
