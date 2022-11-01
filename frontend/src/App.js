import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import EventIndexPage from './components/EventIndexPage';
import EventShowPage from './components/EventShowPage';
import EventFormCreate from './components/EventFormCreate';
import EntryFormPage from './components/EntryFormPage';

const App = () => {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/signin">
            <EntryFormPage />
          </Route>
          <Route exact path="/events/new" component={EventFormCreate} />
          <Route exact path="/events/:eventId">
            <EventShowPage />
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
