import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserShowPage.css';
import * as userActions from '../../store/user';
// import * as eventActions from '../../store/event'
// import * as followActions from '../../store/follow'
import { useDispatch, useSelector } from 'react-redux';
import EventIndexItem from '../EventIndexItem';
import FollowButton from '../FollowButton/index';


const UserShowPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const correctUser = useSelector(state => state.user[userId])
    const eventsRaw = useSelector(state => state.events)
    let follows = useSelector(state => state.follows)
    useEffect(() => {
        dispatch(userActions.getOneUser(userId))
    }, [])

    useEffect(() => {
        dispatch(userActions.getOneUser(parseInt(userId)))
    }, [follows])

    let username = correctUser ? correctUser.username : null
    let followers = correctUser && correctUser.followers ? correctUser.followers : null
    let eventIds = correctUser && correctUser.eventIds ? correctUser.eventIds : null
    let events = eventIds ? (
        <div id='all-user-events'>
            {eventIds.map(evId => {
                return (
                    <EventIndexItem event={eventsRaw[evId]}/>
                )
            })}
        </div>
    ) : (
        <div id='all-user-events'>Events</div>
    )

    return (
        <div id='user-show-page-container'>
            <div id='main-user-profile-container'>
                <div id='user-info-display-container'>
                    <div id='username-title'>
                        {username && (
                            <h1>{username}</h1>
                        )}
                    </div>
                    <div id='total-events-and-followers'>
                        <div>Hosted 100 events total</div>
                        <div>{followers} followers</div>
                    </div>
                    <div id='follow-button-user'>
                        <FollowButton userId={userId} />
                    </div>
                </div>
            </div>
            <div id='user-events-container'>
                <div id='events-title-container'>
                    <div id='event-header'>
                        <h3>Events</h3>
                    </div>
                </div>
                <div id='user-events-index'>
                    {events}
                </div>
            </div>
        </div>
    )
}

export default UserShowPage;