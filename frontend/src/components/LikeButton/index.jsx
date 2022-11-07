import { useDispatch, useSelector } from 'react-redux';
import './LikeButton.css';
import * as likeActions from '../../store/like';

//comment

const LikeButton = ({eventId}) => {
    const dispatch = useDispatch();
    const likes = useSelector(state => state.likes)
    const correctLike = Object.values(likes).find(like => like.eventId === eventId)
    const liked = correctLike ? true : false

    let buttonDisplay = liked ? (
        <div id='button-liked-container' onClick={() => dispatch(likeActions.removeLike())}>
            LIKED
        </div>
    ) : (
        <div id='button-not-liked-container'>
            <span className="material-symbols-rounded" id='like-icon-button'>favorite</span>
        </div>
    )
    return buttonDisplay
}

export default LikeButton;
