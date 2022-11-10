import { useSelector } from 'react-redux';
import './UserPersonalProfilePage.css'

const UserPersonalProfilePage = () => {
    const user = useSelector(state => state.session.user)
    return (
        <div id='pp-page-container'>
            <div id='pp-content-container'>
                <div id='profile-details-container'>
                    {user.username}
                </div>
                <div id='personal-activity-container'>
                    <div id='personal-cont'>
                        TEMP PROFILE
                    </div>
                    <div id='activities-cont'>
                        <div id='orders-container'>
                            Orders
                        </div>
                        <div id='likes-container'>
                            Likes
                        </div>
                        <div id='follows-container'>
                            Following
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPersonalProfilePage;