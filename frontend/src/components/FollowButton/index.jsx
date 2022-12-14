import { useDispatch, useSelector } from 'react-redux';
import './FollowButton.css'
import * as followActions from '../../store/follow'
import { useHistory } from 'react-router-dom';


const FollowButton = ({userId}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows)
    const history = useHistory();

    let correctFollow = Object.values(follows).find(follow => {
        return follow.creatorId == userId
    })
    let followed = correctFollow ? true : false
    const handleFollow = (e) => {
        e.preventDefault();
        if (sessionUser) {
            dispatch(followActions.createFollow({
                creatorId: userId,
                followerId: sessionUser.id
            }))
        } else {
            history.push('/signin/2')
        }
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