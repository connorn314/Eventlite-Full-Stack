import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as likeActions from '../../store/like';
import EventIndexItem from '../EventIndexItem';
import './UserPersonalProfilePage.css'

const UserPersonalProfilePage = () => {
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.session.user)
    const likes = useSelector(state => state.likes)
    const events = useSelector(state => state.events)
    
    

    useEffect(() => {
        dispatch(likeActions.getUserLikes())
    }, [])

    return (
        <div id='pp-page-container'>
            <div id='pp-content-container'>
                <div id='profile-details-container'>
                    <div id='profile-icon-left-container'>
                        <span class="material-symbols-rounded" id="pp-profile-icon">account_circle</span>
                    </div>
                    <div id='profile-details-middle-container-pp'>
                        <div id='pp-username-container'>
                            <div>
                                {user.username}
                            </div>
                            <div id='profile-edit-icon-right-container'>
                                <span class="material-symbols-rounded" id='profile-edit-icon-pp'>edit</span>
                            </div>
                        </div>
                        <div id='pp-orders-likes-followers-container'>
                            <div id='pp-thumbnail-orders' className='pp-thumbnail-info'>
                                0 Orders
                            </div>
                            <div className='dot-spacer' />
                            <div className='pp-thumbnail-info'>
                                0 Likes
                            </div>
                            <div className='dot-spacer' />
                            <div className='pp-thumbnail-info'>
                                0 followers
                            </div>
                        </div>
                    </div>
                </div>
                <div id='personal-activity-container'>
                    <div id='personal-cont'>
                        TEMP PROFILE
                    </div>
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
                            <div className='personal-page-detail-container'>
                                Users I follow
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPersonalProfilePage;