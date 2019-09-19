import React from 'react';
import App from './App.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import store from './store';
import { loadState, saveState } from './localStorage.js';
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import './stylesheets/index.css';
import throttle from 'lodash/throttle';

import thunk from "redux-thunk";
import reducers from "./reducers/combine-reducers";

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  compose(
    applyMiddleware(thunk),
    composeWithDevTools()
  )
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);