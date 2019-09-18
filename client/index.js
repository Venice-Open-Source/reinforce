import React from 'react';
import App from './App.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './stylesheets/index.css';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);