import { useHistory } from 'react-router-dom';
import './LikedIndexItem.css';
import LikeButton from '../LikeButton';

const LikedIndexItem = ({event}) => {
    const { title, location, startDate, id, photoUrl } = event
    const history = useHistory();
    

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/events/${id}`)
    }

    const formatDate = (dateTime) => {
        let change = new Date(dateTime)
        return change.toDateString()
    }


    return (
        <div id='liked-event-container'>
            <div id='liked-event-information'>
                <div id="liked-event-title" onClick={handleClick}>
                    <h4>{title}</h4>
                </div>
                <div id="liked-event-start-time">
                    <p>{formatDate(startDate)}</p>
                </div>
                <div id="liked-event-location">
                    <p>{location}</p>
                    <p>Tickets free</p>
                </div>
            </div>
            <div id='like-and-pic-container'>
                <div id='liked-event-thumbnail'>
                    <img src={photoUrl} alt="liked-event-thumbnail" />
                </div>
                <div id='liked-lb-container'>
                    <div id="liked-page-lb">
                        <LikeButton eventId={id} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LikedIndexItem;