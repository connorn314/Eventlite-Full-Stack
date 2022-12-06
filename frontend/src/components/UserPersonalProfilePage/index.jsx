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
                            <div className='personal-page-titles'>
                                Likes
                            </div>
                            <div className='personal-page-detail-container'>
                                Events I like
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