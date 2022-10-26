import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import './Navigation.css';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li>
                <ProfileButton user={sessionUser} />
            </li>
    );
    } else {
        sessionLinks = (
            <>
            <li>
                <NavLink to="/login">Log In</NavLink>
            </li>
            <br />
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
            </>
        );
    }

    return (
        <ul>
            <li>
            <NavLink exact to="/">Home</NavLink>
            </li>
            <br />
            {sessionLinks}
        </ul>
    );
}

export default Navigation