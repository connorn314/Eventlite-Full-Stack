import React, {useEffect} from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux"; 
import { useState } from "react";


const EventFormCreate = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const example = useSelector(state => state.events[1])

    useEffect(() => {
        // console.log("effect")
    }, [])

    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(endDate)
        // console.log(endTime)
        const parseDate = (date, time) => {
            return `${date}T${time}:00`
        }
        // console.log(parseDate(endDate, endTime))
        // console.log(example)
    }

    return (
        <>
            <h2>Create Event:</h2>
            <form onSubmit={handleSubmit}>
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
                            type="text"
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                        />
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
                <button type="submit">Create Event</button>
            </form>
        </>
    )
};

export default EventFormCreate;