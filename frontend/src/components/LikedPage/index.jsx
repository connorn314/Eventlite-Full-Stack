import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LikedPage.css'
import * as likeActions from '../../store/like';
import LikedIndexItem from '../LikedIndexItem';
import { Redirect } from 'react-router-dom';


const LikedPage = () => {
    const dispatch = useDispatch();
    const likes = useSelector(state => state.likes)
    const events = useSelector(state => state.events)
    const sessionUser = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(likeActions.getUserLikes())
    }, [])
    if (!sessionUser) return <Redirect to="/" />;
    return (
        <div id='likes-index-page-container' >
            <div id='likes-index-container'>
                <div id='likes-header-container'>
                    <h1>Likes</h1>
                </div>
                <div id='liked-events-container'>
                    {Object.values(likes).map(like => {
                        return (
                            <div key={like.id}><LikedIndexItem  event={events[like.eventId]} /></div>
                    )})}
                </div>
            </div>
        </div>
    )


}

export default LikedPage;