import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as likeActions from '../../store/like';
import EventIndexItem from '../EventIndexItem';
import './UserPersonalProfilePage.css'
import FollowIndexItem from '../FollowIndexItem';
import { TextField } from '@mui/material';

const UserPersonalProfilePage = () => {
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.session.user)
    const likes = useSelector(state => state.likes)
    const events = useSelector(state => state.events)
    const follows = useSelector(state => state.follows)

    const style = {
        height: 33,
        padding: '18px 12px 6px',
        backgroundColor: "white",
        border: '.5px solid rgb(188, 188, 188)',
        borderRadius: '2px'
    }

    // const followers = (user) ? user.followers : null
    const [editUserInfo, showEditUserInfo] = useState(false);
    const [username, setUsername] = useState(user.username)
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        dispatch(likeActions.getUserLikes())
    }, [])

    const handleSubmit = () => {
        console.log("submit")
    }

    const handleDiscard = (e) => {
        e.preventDefault();
        showEditUserInfo(!editUserInfo);
        setUsername(user.username);
        setPhotoFile(null)
    }

    const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        setPhotoFile(file);
    }

    return (
        <div id='pp-page-container'>
            <div id='pp-content-container'>
                <div id='edit-user-and-profile-details-container'>
                    {editUserInfo ? (
                        <form onSubmit={handleSubmit}>
                            <div id='edit-profile-details-container'>
                                <div id='edit-profile-general-container'>
                                    <div id='edit-profile-icon-left-container'>
                                        <div id='inner-edit-profile-icon-container'>
                                            <input type="file" onChange={handleFile} />
                                        </div>
                                        {/* <span class="material-symbols-rounded" id="pp-profile-icon">account_circle</span> */}
                                    </div>
                                    <div id='pp-edit-username-container'>
                                    <TextField
                                        label="New username"
                                        variant="filled"
                                        className="user-input-box"
                                        inputProps={{style}}
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div id='submit-new-user-info'>
                                        <button className="form-submit-button" id='form-submit-profile'>
                                            Save
                                        </button>
                                        <div className="discard-button-profile" onClick={handleDiscard}>
                                            Discard
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div id='profile-details-container'>
                            <div id='profile-icon-left-container'>
                                <span class="material-symbols-rounded" id="pp-profile-icon">account_circle</span>
                            </div>
                            <div id='profile-details-middle-container-pp'>
                                <div id='pp-username-container'>
                                    <div>
                                        {user.username}
                                    </div>
                                    <div id='profile-edit-icon-right-container' onClick={() => showEditUserInfo(!editUserInfo)}>
                                        <span class="material-symbols-rounded" id='profile-edit-icon-pp'>edit</span>
                                    </div>
                                </div>
                                <div id='pp-orders-likes-followers-container'>
                                    <div id='pp-thumbnail-orders' className='pp-thumbnail-info'>
                                        0 orders
                                    </div>
                                    <div className='dot-spacer' />
                                    <div className='pp-thumbnail-info'>
                                        {Object.values(likes).length} likes
                                    </div>
                                    <div className='dot-spacer' />
                                    <div className='pp-thumbnail-info'>
                                        {Object.values(follows).length} following
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div id='personal-activity-container'>
                    <div id='activities-cont'>
                        <div id='orders-container'>
                            <div id='orders-title-container' className='personal-page-titles'>
                                Orders
                            </div>
                            <div id='orders-details-container' className='personal-page-detail-container'>
                                <span className="material-symbols-outlined" id='no-tickets-icon'>description</span>
                                <div>
                                    You have no orders right now
                                </div>
                            </div>
                        </div>
                        <div id='pp-spacer'/>
                        <div id='likes-container'>
                            <div id='likes-title-container-pp' className='personal-page-titles'>
                                <div id="likes-title-pp" >
                                    Likes 
                                </div>
                                <div id='like-expander-icon-container'>
                                    <span class="material-symbols-outlined" id='like-expander-icon'>chevron_right</span>
                                </div>
                            </div>
                            <div className='personal-page-detail-container'>
                                <div id="likes-detail-container-pp" className='personal-page-detail-container'>
                                    {Object.values(likes).map(like => {
                                        return (
                                            <div key={like.id} className="liked-event-container-pp"><EventIndexItem event={events[like.eventId]} /></div>
                                    )})}
                                </div>
                            </div>
                        </div>
                        <div id='pp-spacer'/>
                        <div id='follows-container'>
                            <div className='personal-page-titles'>
                                Following
                            </div>
                            <div id='follow-index-container'>
                                {Object.values(follows).map(follow => {
                                    return (
                                        <div key={follow.id}><FollowIndexItem userId={follow.creatorId} /></div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPersonalProfilePage;