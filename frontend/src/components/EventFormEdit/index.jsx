import React from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux"; 
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import '../EventFormCreate/EventFormCreate.css'


const EventFormEdit = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const { eventId } = useParams();
    const eventEdit = useSelector(state => state.events[eventId])
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(eventEdit.title);
    const [description, setDescription] = useState(eventEdit.description);
    const [location, setLocation] = useState(eventEdit.location);
    const strt = new Date(eventEdit.startDate)
    const endD = new Date(eventEdit.endDate)

    const twoDigits = (num) => {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num.toString();
        }
    }
    const formatDate = (date) => {
        return `${twoDigits(date.getFullYear())}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`
    }

    const formatTime = (date) => {
        return `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`
    }

    const [startDate, setStartDate] = useState(formatDate(strt));
    const [startTime, setStartTime] = useState(formatTime(strt));
    const [endDate, setEndDate] = useState(formatDate(endD));
    const [endTime, setEndTime] = useState(formatTime(endD));
    const [photoFile, setPhotoFile] = useState(null);
    
    const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        setPhotoFile(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
    
        const parseDate = (date, time) => {
            return `${date} ${time}:00`
        }
        
        const obj = {
            id: eventId,
            title,
            description,
            location,
            startDate: parseDate(startDate, startTime),
            endDate: parseDate(endDate, endTime),
            photoFile
        }


        return dispatch(eventActions.editEvent(obj))
            .then(data => history.push(`/events/${Object.values(data)[0].id}`))
            .catch(async (res) => {
            let data;
            try {
            data = await res.clone().json();
            } catch {
            data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        })
    }
    
    return (
        <div id="edit-event-page-container">
            <div id="Edit-event-page">
                <h2>Edit Event:</h2>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {Object.values(errors).flat().map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <label>
                        Basic info
                        <br />
                        <label>
                            Event Title:
                            <input 
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <br />
                        <label>
                            Event Description:
                            <input 
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </label>
                    </label>
                    <br />
                    <br />
                    <label>
                        Location
                        <input 
                            type="text"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Date and time
                        <br />
                        <label>
                            Event Starts:
                            <input 
                                type="date"
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startDate}
                            />
                            <input 
                                type="time"
                                onChange={(e) => setStartTime(e.target.value)}
                                value={startTime} />
                        </label>
                        <br />
                        <label>
                            Event Ends:
                            <input 
                                type="date"
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                            />
                            <input 
                                type="time"
                                onChange={(e) => setEndTime(e.target.value)}
                                value={endTime} />
                        </label>
                    </label>
                    <br />
                    <br />
                    <label>
                        Add a photo:
                        <input 
                            type="file"
                            onChange={handleFile} />
                    </label>
                    <br />
                    <br />
                    <button type="submit">Edit Event</button>
                </form>
            </div>        
        </div>
    )
};

export default EventFormEdit;