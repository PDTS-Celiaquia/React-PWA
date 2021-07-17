import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainRouter from './router/MainRouter';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import getStore from './store';

ReactDOM.render(
  <Provider store={getStore()}>
    <MainRouter />
  </Provider>
  ,
  document.getElementById('root')
);

// TODO: check
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
