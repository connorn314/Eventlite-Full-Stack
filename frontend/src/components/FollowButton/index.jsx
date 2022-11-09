import { useDispatch, useSelector } from 'react-redux';
import './FollowButton.css'
import * as followActions from '../../store/follow'


const FollowButton = ({userId}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows)

    let correctFollow = Object.values(follows).find(follow => {
        return follow.creatorId == userId
    })
    let followed = correctFollow ? true : false
    const handleFollow = (e) => {
        e.preventDefault();
        dispatch(followActions.createFollow({
            creatorId: userId,
            followerId: sessionUser.id
        }))
    }
    let followButtonDisplay = followed ? (
        <div id='button-followed' onClick={() => dispatch(followActions.deleteFollow(correctFollow.id))}>
            Following
        </div>
    ) : (
        <div id="button-not-followed" onClick={handleFollow}>
            Follow
        </div>
    )

    return (
        <>
            {followButtonDisplay}
        </>
    )   
}

export default FollowButton;