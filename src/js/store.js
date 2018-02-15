import { createStore, compose, applyMiddleware } from '@0xcda7a/redux-es6';
import thunk from 'redux-thunk';

import { lazyReducerEnhancer } from './lib/lazyReducerEnhancer.js'
const composeMid = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  (state, action) => state,
  composeMid(lazyReducerEnhancer),
  applyMiddleware(thunk)
);

// Initially loaded reducers.
import app from './reducers/app.js';
import data from './reducers/data.js';
store.addReducers({
  app, data
});
