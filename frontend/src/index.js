import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as eventActions from './store/event';
import * as userActions from './store/user';
import * as likeActions from './store/like';
import * as followActions from './store/follow';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {

  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.eventActions = eventActions
}

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

if (sessionStorage.getItem("currentUser") === null || sessionStorage.getItem("X-CSRF-Token") === null) {
  store.dispatch(sessionActions.restoreSession())
  .then(store.dispatch(userActions.getUsersData()))
  .then(store.dispatch(eventActions.getEventsData()))
  .then(store.dispatch(likeActions.getUserLikes()))
  .then(store.dispatch(followActions.getUserFollows()))
  .then(renderApplication);
} else {
  store.dispatch(eventActions.getEventsData())
  .then(store.dispatch(userActions.getUsersData()))
  .then(store.dispatch(likeActions.getUserLikes()))
  .then(store.dispatch(followActions.getUserFollows()))
  .then(renderApplication)  
}