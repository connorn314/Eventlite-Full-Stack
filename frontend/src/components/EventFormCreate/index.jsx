import React from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux"; 
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './EventFormCreate.css'


const EventFormCreate = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const event = useSelector(state => state.events)
    
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

        // if (photoFile) {
        //     formData.append('event[photo]', photoFile)
        // }
        
        const obj = {
            title,
            description,
            location,
            startDate: parseDate(startDate, startTime),
            endDate: parseDate(endDate, endTime),
            photoFile
        }

        return dispatch(eventActions.createEvent(obj))
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
        <>
        <div id="create-event-page">
            <h2>Create Event:</h2>
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
                <button type="submit">Create Event</button>
            </form>
        </div>        
        </>
    )
};

export default EventFormCreate;