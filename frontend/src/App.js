import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import EventIndexPage from './components/EventIndexPage';

const App = () => {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <>
            <h1>Hello from App</h1>
            <EventIndexPage />
            </>
          </Route>
        </Switch>
    </>
  );
}

export default App;
