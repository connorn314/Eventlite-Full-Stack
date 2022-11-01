import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../EventliteLogo.png';
import './Navigation.css';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div id='create-event-link'>
                    <NavLink to="/events/new">Create Event</NavLink>
                </div>
                <div id='profile-dropdown'>
                    <ProfileButton user={sessionUser} />
                </div>
            </>
    );
    } else {
        sessionLinks = (
            <p>Nothing</p>
        );
    }

    return (
        <div id='nav-bar'>
            <div id='home-logo'>
                <NavLink exact to="/"><img src={logo}></img></NavLink>
            </div>

            <br />
            <div id='nav-right'>
                {sessionLinks}
            </div>
        </div>
    );
}

export default Navigation