import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import EventIndexPage from './components/EventIndexPage';
import EventShowPage from './components/EventShowPage';
import EventFormCreate from './components/EventFormCreate';
import EntryFormPage from './components/EntryFormPage';
import LandingPicture from './landingPicture.jpeg';
import './index.css'
import Footer from './components/Footer';
import EventFormEdit from './components/EventFormEdit';
import LikedPage from './components/LikedPage';
import UserShowPage from './components/UserShowPage';

const App = () => {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/signin/:formId">
            <EntryFormPage />
          </Route>
          <Route exact path="/users/:userId" component={UserShowPage} />
          <Route exact path="/events/new" component={EventFormCreate} />
          <Route exact path="/events/:eventId/edit" component={EventFormEdit} />
          <Route exact path="/events/:eventId">
            <EventShowPage />
          </Route>
          <Route exact path="/likes" component={LikedPage}/>
          <Route path="/">
            <div id='landing-page-container'>
              <div id='landing-page-image' >
                <img src={LandingPicture} alt="landing-picture" id='landing'></img>
              </div>
              <div id='landing-page-index' >
                <EventIndexPage />
              </div>
            </div>
          </Route>
        </Switch>
      <Footer />
    </>
  );
}

export default App;
