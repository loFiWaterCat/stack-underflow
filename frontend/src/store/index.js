import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import questions from './questions';
import answers from './answers';
import users from './users';
import votes from './votes';
import comments from './comments';

const entitiesReducer = combineReducers({
  questions,
  answers,
  comments,
  users,
  votes,
})

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
