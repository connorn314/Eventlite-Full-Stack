import React, { useEffect, useState } from "react";
import * as eventActions from '../../store/event';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import './EventShowPage.css'
import backGroundImage from "../../showpage.png"
import LikeButton from "../LikeButton";

const EventShowPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const { eventId } = useParams();
    const showEvent = useSelector(state => state.events[eventId]);
    const author = useSelector(state => state.user[showEvent.authorId])
    let correctId = false
    if (author){
        correctId = (sessionUser && (sessionUser.id === showEvent.authorId));
    } 
    const [userEvent, toggleUserEvent] = useState(correctId);

    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId))
    }, [])

    const authorInformation = userEvent ? (
    <div id="user-author-container">
        <div>
            You created this event
        </div>
    </div>
    ) : (
    <div id="follower-author-container">
        <div id="event-creator">
            By: <NavLink to={`/users/${author.id}`}>{author && (author.username)}</NavLink>
        </div>
        <div id="follower-information">
            420 followers<button>Follow</button>
        </div>
    </div>
    )

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(eventActions.deleteEvent(eventId))
        history.push('/')
    }

    return (
        <div id="show-page-container">
            <div id='back-ground-pic'><img src={backGroundImage} alt="bgc image"/></div>
            <div id='show-page-layout'>
                <div id="event-pic-container">
                    <img src={showEvent.photoUrl} alt="hi" />        
                </div>
            </div>
            
            <div id="show-page-detail">
                {sessionUser && userEvent && (
                    <div id="edit-your-event-message">
                        You are the owner of this event.

                        Do you want to make some changes? <button onClick={() => history.push(`/events/${showEvent.id}/edit`)}>Edit event</button>
                    </div>
                )}
                <div id="details-container">
                    <div id="main-event-details-top">
                        <div id="event-day">
                            {showEvent.startDate}
                        </div>
                        <div id="event-title-big">
                            <h1>{showEvent.title}</h1>
                        </div>
                        <div id="event-description-detail">
                            <p>{showEvent.description}</p>
                        </div>
                        {authorInformation}
                        <div>
                            When and where
                        </div>
                        <div id="date-location-container">
                            <div id="date-andtime-info">
                                start date: {showEvent.startDate}
                                <br />
                                end date: {showEvent.endDate}
                            </div>
                            <div id="location-info-small">
                                location: {showEvent.location}
                            </div>
                        </div>
                        <div>
                            Show map 
                        </div>
                    </div>
                    <div id="get-tickets-container">
                        <div id="like-and-share-cont">
                            <LikeButton eventId={eventId} />
                        </div>
                        <div id="get-t-and-p-container">
                            <div id="get-tickets-and-price">
                                <div id="price">
                                    $25 - $40
                                </div>
                                <div id="get-tickets">
                                    Get Tickets
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EventShowPage