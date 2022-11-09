import React, { useEffect } from 'react';
import * as eventActions from '../../store/event';
import * as userActions from '../../store/user';
import * as likeActions from '../../store/like';
import { useDispatch, useSelector } from 'react-redux';
import EventIndexItem from '../EventIndexItem';
import './EventIndexPage.css'
import { useState } from 'react';
import { TextField } from '@mui/material';



const EventIndexPage = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [searchLocation, setSearchLocation] = useState("");

    useEffect(() => {
        dispatch(userActions.getUsersData())
        dispatch(eventActions.getEventsData())
        dispatch(likeActions.getUserLikes())
    }, [])
    const events = useSelector(state => state.events);
    const handleSubmit = () => {

    }
    

    return (
        <>
        <div id='index'>
            <div id='pick-search-location'>
                <h2>Popular in</h2>
                    <div id='pick-search-bar' >
                        <span className="material-symbols-rounded" id='drop-icon'>expand_more</span>
                        <form onSubmit={handleSubmit} >
                            <TextField
                                variant='standard'
                                id='search-bar-text'
                                placeholder='San Francisco'
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}

                                ></TextField>
                        </form>
                    </div>      
            </div>
            <div id='display-search-location-header'>
                <h3>Events in San Francisco</h3>
            </div>
            <div id='index-display'>
                {Object.values(events).map( (ev) => {
                    return (
                        <EventIndexItem event={ev} key={ev.id}/>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default EventIndexPage;