import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './EventIndexItem.css'
import LikeButton from "../LikeButton";

const EventIndexItem = ({event}) => {
    const { title, location, startDate, authorId, id, photoUrl } = event
    const history = useHistory();
    const user = useSelector(state => state.user[authorId])

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/events/${id}`)
    }

    const formatDate = (dateTime) => {
        let change = new Date(dateTime)
        return change.toDateString()
    }

    
    return (
        <>
            <div id="event-container" >
                <div id="event-thumbnail" onClick={handleClick}>
                    <img src={photoUrl} alt="event-thumbnail" />
                </div>
                <div id="event-information">
                    <div id="event-title" onClick={handleClick}>
                        <h4>{title}</h4>
                    </div>
                    <div id="event-start-time">
                        <p>{formatDate(startDate)}</p>
                    </div>
                    <div id="event-location">
                        <p>{location}</p>
                    </div>
                    <div id="event-author">
                        <div id="author">
                            <p>{user.username}</p>
                        </div>
                        <div id="follower-count">
                            <span className="material-symbols-rounded" id="profile-symbol-item">
                                account_circle
                            </span><p>420 followers</p> 
                        </div>
                    </div>
                    <LikeButton eventId={id}></LikeButton>
                </div>

            </div>
        </>
    )
}

export default EventIndexItem