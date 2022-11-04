import React, { useEffect, useState } from "react";
import * as eventActions from '../../store/event';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import './EventShowPage.css'
import backGroundImage from "../../showpage.png"

const EventShowPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const { eventId } = useParams();
    const showEvent = useSelector(state => state.events[eventId])

    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId))
    }, [])

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
                <div id="details-container">
                    <div id="main-event-details-top">
                        <div id="event-day">
                            {showEvent.startDate}
                        </div>
                        <div id="event-title-big">
                            <h2>{showEvent.title}</h2>
                        </div>
                        <div id="event-description-detail">
                            <p>{showEvent.description}</p>
                        </div>
                        <div id="follower-author-container">
                            <div id="event-creator">
                                Author is #{showEvent.authorId}
                            </div>
                            <div id="follower-information">
                                420 followers<button>Follow</button>
                            </div>
                        </div>
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
                        <div id="get-tickets-and-price">
                            <div id="price">
                                $25 - $40
                            </div>
                            <div id="get-tickets">
                                GET TICKETS
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EventShowPage