import React, { useEffect } from 'react';
import * as eventActions from '../../store/event';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EventIndexItem from '../EventIndexItem';
import './EventIndexPage.css'


const EventIndexPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(eventActions.getEventsData())
    }, [])
    const events = useSelector(state => state.events)

    

    return (
        <div id='index-display'>
            {Object.values(events).map( (ev) => {
                return (
                    <EventIndexItem event={ev}/>
                )
            })}
        </div>
    )
}

export default EventIndexPage;