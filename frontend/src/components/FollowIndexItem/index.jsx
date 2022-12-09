import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as userActions from '../../store/user';
import FollowButton from '../FollowButton/index';
import './FollowIndexItem.css'

const FollowIndexItem = ({userId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user[userId])

    useEffect(() => {
        if (!user){
            dispatch(userActions.getOneUser(userId)) 
        }
    }, [])
    

    return (
        <div id='follow-index-item-container'>
            {user && (
                <div id='follow-ii-content-container'>
                    <div id='fii-profile-pic-thumbnail'>
                        <div id='profile-icon-square'>
                            <span className="material-symbols-rounded" id="fii-profile-icon">account_circle</span>
                        </div>
                    </div>
                    <div id='fii-username-cont'>
                        <div id='fii-username-title' onClick={() => history.push(`/users/${userId}`)}>
                            {user.username}
                        </div>
                    </div>
                    <div id='fii-follow-button-cont'>
                        <FollowButton userId={userId} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default FollowIndexItem;

