import { useDispatch, useSelector } from 'react-redux';
import './LikeButton.css';
import * as likeActions from '../../store/like';
import { useHistory } from 'react-router-dom';


//comment

const LikeButton = ({eventId}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const likes = useSelector(state => state.likes)
    const history = useHistory();

    let correctLike = Object.values(likes).find(like => {
        return like.eventId == eventId
    })
    let liked = correctLike ? true : false
    const handleLike = (e) => {
        e.preventDefault()
        if (sessionUser) {
            dispatch(likeActions.createLike({
                eventId, 
                likerId: sessionUser.id
            }))
        } else {
            history.push('/signin/2')
        }
    }
    
    let buttonDisplay = liked ? (
        <div id='button-liked-container' onClick={() => dispatch(likeActions.deleteLike(correctLike.id))}>
            <span className="material-symbols-outlined" id='unlike-icon-button'>favorite</span>
        </div>
    ) : (
        <div id='button-not-liked-container' onClick={handleLike}>
            <span className="material-symbols-rounded" id='like-icon-button'>favorite</span>
        </div>
    )
    return (
        <>
        {buttonDisplay}
        </>
    )
}

export default LikeButton;
