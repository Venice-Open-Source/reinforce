/**
 * ************************************
 *
 * @module  index.js
 * @author Billy and Jake
 * @description All reduces (we only have one) get combined here to be passed into createStore later on
 *
 * ************************************
 */

import { combineReducers } from 'redux';

// import all reducers here
import reinforceReducer from './reinforceReducer';


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  reinforce: reinforceReducer,
});

// make the combined reducers available for import
export default reducers;