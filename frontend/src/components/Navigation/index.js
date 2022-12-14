import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../EventliteLogo.png';
import './Navigation.css';


const Navigation = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);


    const openMenu = () => {
        setShowMenu(true);
    };

    const handleCreate = () => {
        history.push("/events/new")
    };

    const handleLogin = () => {
        setShowMenu(false)
        history.push('/signin/2')
    };

    const handleSignup = () => {
        setShowMenu(false)
        history.push('/signin/1')
    };

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <div id='create-event-link' onClick={handleCreate}>
                    <div >
                        <span className="material-symbols-outlined" id='add-icon'>add</span>
                    </div>
                    <div id='create-an-event' className="add-arial-text">
                        Create an event
                    </div>
                </div>
                <div id='likes-nav-item' onClick={() => history.push('/likes')}>
                    <div id='like-container'>
                        <span className="material-symbols-rounded" id='like-icon'>favorite</span>
                    </div>
                    <div id='likes-text' className="add-arial-text">
                        Likes
                    </div>
                </div>
                <div id='tickets-nav-item' onClick={() => history.push('/profile')} >
                    <div id='ticket-nav-icon-container'>
                        <span className="material-symbols-rounded" id='tick-icon'>confirmation_number</span>
                    </div>
                    <div id='tickets-text' className='add-arial-text'>
                        Tickets
                    </div>
                </div>
                <div id='profile-dropdown' onMouseEnter={openMenu} onMouseLeave={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
                    <ProfileButton user={sessionUser} show={showMenu} />
                </div>
            </>
    );
    } else {
        sessionLinks = (
            <>
                <div id='create-event-link' onClick={handleLogin}>
                    <div id='create-an-event-logged-out' className="add-arial-text">
                        Create an event
                    </div>
                </div>
                <div id='log-in-button' onClick={handleLogin}>
                    <div id='log-in' className="add-arial-text">
                        Log In
                    </div>
                </div>
                <div id='sign-up-button' onClick={handleSignup}>
                    <div id='sign-up' className="add-arial-text">
                        Sign Up
                    </div>
                </div>
            </>
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