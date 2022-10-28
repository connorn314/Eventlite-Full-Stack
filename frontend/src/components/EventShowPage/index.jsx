import React, { useEffect } from "react";
import * as eventActions from '../../store/event';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EventShowPage = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId))
    }, [])
    const showEvent = useSelector(state => state.events[eventId])

    
    return (
        <>
        <ul>
            {showEvent && Object.values(showEvent).map(detail => {
                return <li>{detail}</li>
            })}
        </ul>
        </>
    )
};

export default EventShowPage