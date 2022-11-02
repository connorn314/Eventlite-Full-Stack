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
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleCreate = () => {
        history.push("/events/new")
    }

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <div id='create-event-link' onClick={handleCreate}>
                    <div >
                        <span className="material-symbols-outlined" id='add-icon'>add</span>
                    </div>
                    <div id='create-an-event'>
                        Create an event
                    </div>
                </div>
                <div id='likes-nav-item'>
                    <div id='like-container'>
                        <span className="material-symbols-rounded" id='like-icon'>favorite</span>
                    </div>
                    <div id='likes-text'>
                        Likes
                    </div>
                </div>
                <div id='profile-dropdown' onMouseEnter={openMenu} onMouseLeave={() => setShowMenu(false)}>
                    <ProfileButton user={sessionUser} show={showMenu} />
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