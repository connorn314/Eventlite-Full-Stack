import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LikedPage.css'
import * as likeActions from '../../store/like';
import EventIndexItem from '../EventIndexItem';


const LikedPage = () => {
    const dispatch = useDispatch();
    const likes = useSelector(state => state.likes)
    const events = useSelector(state => state.events)


    useEffect(() => {
        dispatch(likeActions.getUserLikes())
    }, [])

    return (
        <div id='likes-index-container'>
            <div id='likes-header-container'>
                <h1>Likes</h1>
            </div>
            <div id='liked-events-container'>
                {Object.values(likes).map(like => {
                    return (
                    <div>like id: {like.id} 
                        <div><EventIndexItem event={events[like.eventId]}></EventIndexItem></div>
                    </div>

                )})}
            </div>
        </div>
    )


}

export default LikedPage;