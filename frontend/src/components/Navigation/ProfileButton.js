import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = (props) => {
    const dispatch = useDispatch();
    const user = props.user
    const showMenu = props.show

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
        <div id='profile-dropdown-contents' >
            <span className="material-symbols-rounded" id="profile-symbol">
                account_circle
            </span>
            <span id='profile-email'>
                {user.email}
            </span>
            <span className="material-symbols-rounded">
                expand_more
            </span>
        </div>
        {showMenu && (
            <div id="profile-dropdown-list">
                <div className="drop-item">Browse events</div>
                <div className="drop-item" id="border">Manage my events</div>
                <div className="drop-item">Tickets (0)</div>
                <div className="drop-item">Liked</div>
                <div className="drop-item" id="border">Following</div>
                <div className="drop-item">{user.email}</div>
                <div className="drop-item">{user.username}</div>
                <div className="drop-item" onClick={logout}>Log Out</div>
            </div>
            )}
        </>
    );
}

export default ProfileButton;