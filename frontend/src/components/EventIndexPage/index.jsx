import React, { useEffect, useState } from 'react';
import * as eventActions from '../../store/event';
import { useDispatch, useSelector } from 'react-redux';


const EventIndexPage = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(eventActions.getEventsData())
    }, [])
    const events = useSelector(state => state.events)
    console.log(events)
    // const [errors, setErrors] = useState([]);
    
    return (
        <ul>
            {Object.values(events).map( ev => {
                return (
                    <>
                        <li>{ev.title}
                            <ul>
                                <li>Event id: {ev.id}</li>
                                <li>Creator id: {ev.authorId}</li>
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