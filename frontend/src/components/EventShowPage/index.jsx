import React, { useEffect, useState } from "react";
import * as eventActions from '../../store/event';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const EventShowPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const { eventId } = useParams();
    const showEvent = useSelector(state => state.events[eventId])

    console.log(showEvent)
    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId))
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(eventActions.deleteEvent(eventId))
        history.push('/')
    }

    return (
        <>
        <ul>
            {showEvent && Object.values(showEvent).map(detail => {
                return <li>{detail}</li>
            })}
        </ul>
            {(showEvent.authorId === sessionUser.id) && (
                <button onClick={handleDelete}>Delete</button>
            )}
        </>
    )
};

export default EventShowPage