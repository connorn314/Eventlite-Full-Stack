import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

const ProfileButton = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = props.user
    const showMenu = props.show

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
        <div id='profile-dropdown-contents' className="add-arial-text" >
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
                <div className="drop-item" onClick={() => history.push('/')}>Browse events</div>
                <div className="drop-item" id="border" onClick={() => history.push('/manage/events')}>Manage my events</div>
                <div className="drop-item" onClick={() => history.push('/profile')}>Tickets (0)</div>
                <div className="drop-item" onClick={() => history.push('/likes')}>Liked</div>
                <div className="drop-item" id="border" onClick={() => history.push('/profile')}>Following</div>
                <div className="drop-item">{user.email}</div>
                <div className="drop-item">{user.username}</div>
                <div className="drop-item" onClick={logout}>Log Out</div>
            </div>
            )}
        </>
    );
}

export default ProfileButton;