import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import EventIndexPage from './components/EventIndexPage';
import EventShowPage from './components/EventShowPage';
import EventFormCreate from './components/EventFormCreate';
import EntryFormPage from './components/EntryFormPage';
import LandingPicture from './landingPicture.jpeg';
import './index.css'

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
            <div id='landing-page-container'>
              <img src={LandingPicture} alt="landing-picture" id='landing'></img>
              <EventIndexPage />
            </div>
          </Route>
        </Switch>
    </>
  );
}

export default App;
