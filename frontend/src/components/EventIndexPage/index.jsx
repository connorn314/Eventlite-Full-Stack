import React, { useEffect } from 'react';
import * as eventActions from '../../store/event';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


const EventIndexPage = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(eventActions.getEventsData())
    }, [])
    const events = useSelector(state => state.events)

    return (
        <ul key={"index-page"}>
            {Object.values(events).map( ev => {
                return (
                    <>
                        <li key={ev.id}>{ev.title}
                            <ul>
                                <li key={ev.id}>Event id: {ev.id}</li>
                                <li key={ev.authorId}>Creator id: {ev.authorId}</li>
                                <NavLink to={`/events/${ev.id}`} key={ev.id}>Go to Event</NavLink>
                            </ul>
                        </li>
                        <br />
                    </>
                )
            })}
        </ul>
    )
}

export default EventIndexPage;