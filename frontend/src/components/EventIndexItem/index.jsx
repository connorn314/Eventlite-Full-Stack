import React from "react";
import { useHistory } from "react-router-dom";
import './EventIndexItem.css'

const EventIndexItem = ({event}) => {
    const { title, location, startDate, authorId, id } = event
    const history = useHistory();
    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/events/${id}`)
    }

    const formatDate = (dateTime) => {
        
        return dateTime
    }

    
    return (
        <>
            <div id="event-container" onClick={handleClick}>
                <div id="event-thumbnail">
                    <h2>PLACEHOLDER IMG</h2>
                </div>
                <div id="event-information">
                    <div id="event-title">
                        <h4>{title}</h4>
                    </div>
                    <div id="event-start-time">
                        <p>starts at {formatDate(startDate)}</p>
                    </div>
                    <div id="event-location">
                        <p>{location}</p>
                    </div>
                    <div id="event-author">
                        <div id="author">
                            <p>Author is #{authorId}</p>
                        </div>
                        <div id="follower-count">
                            <span className="material-symbols-rounded" id="profile-symbol">
                                account_circle
                            </span><p>420 followers</p> 
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EventIndexItem