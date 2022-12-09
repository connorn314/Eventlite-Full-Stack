import React, { useEffect } from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux"; 
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import './EventFormEdit.css'
import { Redirect } from "react-router-dom";



const EventFormEdit = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const { eventId } = useParams();
    const eventEdit = useSelector(state => state.events[eventId])
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(eventEdit.title);
    const [location, setLocation] = useState(eventEdit.location);
    const strt = new Date(eventEdit.startDate)
    let endD = new Date(eventEdit.endDate)
    const [description, setDescription] = useState("");

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
    const [price, setPrice] = useState(eventEdit.price);
    const [totalTickets, setTotalTickets] = useState(eventEdit.ticketsAllotted);
    

    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId))
        .then(data => {
            setDescription(Object.values(data)[0].description)
        })
    }, [])


    const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        setPhotoFile(file);
    }

    const handleDiscard = (e) => {
        e.preventDefault();
        history.push('/')
    }

    const style = {
        height: 28,
        padding: '18px 12px 6px',
        backgroundColor: "white",
        border: '.5px solid rgb(188, 188, 188)',
        borderRadius: '2px',
        fontSize: '14px'
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
            price,
            ticketsAllotted: totalTickets,
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

    if (!sessionUser) return <Redirect to="/" />;
    
    return (
        <div id="edit-event-page-container">
            <div id="edit-event-page">
                <h2 className="form-title-black">Edit Event</h2>
                <ul>
                    {Object.values(errors).flat().map(error => <li key={error}>{error}</li>)}
                </ul>
                <div id="edit-form-container">
                    <div className="icon-container">
                        <div id="basic-info-icon-container" >
                            <span class="material-symbols-outlined" id="basic-info-icon">docs_add_on</span>
                        </div>
                        <div id="location-icon-container-small">
                            <span class="material-symbols-outlined" id="location-icon-small">map</span>
                        </div>
                        <div id="date-time-icon-container">
                            <span class="material-symbols-outlined" id="date-time-icon">calendar_month</span>
                        </div>
                        <div id="add-photo-icon-container">
                            <span class="material-symbols-outlined" id="add-photo-icon">image</span>
                        </div>
                        <div id="add-ticketing-info">
                            <span class="material-symbols-rounded" id="tickets-icon">confirmation_number</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} id="edit-event-form-actual">
                        <div id="basic-info-edit-container" className="form-block">
                            <div id="basic-info-edit-header" className="details-block">
                                <div id="bi-edit-header" className="header-block">
                                    Basic info
                                </div>
                                <div id="bi-sub-edit-header" className="sub-header-block">
                                    Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
                                </div>
                            </div>
                        </div>

                        <TextField
                            label="Event title"
                            variant="filled"
                            placeholder="Be clear and descriptive"
                            inputProps={{style}}
                            InputProps={{disableUnderline: true}}
                            InputLabelProps={{ shrink: true }}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                            />
                        <br />
                        {description && (
                            <TextField
                                label="Event Summary"
                                variant="filled"
                                placeholder="Be clear and descriptive"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                InputLabelProps={{ shrink: true }}
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                required
                                />

                        )}
                        <br />
                        <br />
                        <div id="location-edit-container" className="form-block">
                            <div id="location-edit-header" className="details-block">
                                <div id="loaction-edit-header" className="header-block">
                                    Location
                                </div>
                                <div id="loaction-sub-edit-header" className="sub-header-block">
                                    Help people in the area discover your event and let attendees know where to show up.
                                </div>
                            </div>
                        </div>
                        <TextField
                                label="Location"
                                variant="filled"
                                placeholder="Enter a venue or address"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                InputLabelProps={{ shrink: true }}
                                type="text"
                                onChange={(e) => setLocation(e.target.value)}
                                value={location}
                                required
                                />
                        <br />
                        <br />
                        <div id="date-time-edit-container" className="form-block">
                            <div id="date-time-edit-header" className="details-block">
                                <div id="date-time-edit-header" className="header-block">
                                    Date and time
                                </div>
                                <div id="date-time-edit-sub-header" className="sub-header-block">
                                    Tell event-goers when your event starts and ends so they can make plans to attend.
                                </div>
                            </div>
                        </div>
                        <div className="date-time-block">
                            <TextField
                                label="Event Starts"
                                variant="filled"
                                placeholder="Enter a venue or address"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                sx={{width: '49.5%'}}
                                InputLabelProps={{ shrink: true }}
                                type="date"
                                onChange={(e) => {setStartDate(e.target.value)}}
                                value={startDate}
                                required
                                />

                            <TextField
                                label="Start Time"
                                variant="filled"
                                placeholder="Enter a venue or address"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                sx={{width: '49.5%'}}
                                InputLabelProps={{ shrink: true }}
                                type="time"
                                onChange={(e) => {setStartTime(e.target.value)}}
                                value={startTime}
                                required
                                />
                        </div>
                        <br />
                        {endD != strt && (
                            <div className="date-time-block">
                                <TextField
                                    label="Event Ends"
                                    variant="filled"
                                    placeholder="Enter a venue or address"
                                    inputProps={{style}}
                                    InputProps={{disableUnderline: true}}
                                    sx={{width: '49.5%'}}
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={endDate}
                                    required
                                    />
                                <TextField
                                    label="End Time"
                                    variant="filled"
                                    placeholder="Enter a venue or address"
                                    inputProps={{style}}
                                    InputProps={{disableUnderline: true}}
                                    sx={{width: '49.5%'}}
                                    InputLabelProps={{ shrink: true }}
                                    type="time"
                                    onChange={(e) => setEndTime(e.target.value)}
                                    value={endTime}
                                    required
                                    />
                            </div>  
                        )}
                        <br />
                        <br />
                        <div id="create-photo-edit-container" className="form-block">
                            <div id="create-photo-edit-header" className="details-block">
                                <div id="create-photo-edit-header" className="header-block">
                                    Main event image
                                </div>
                                <div id="create-photo-edit-sub-header" className="sub-header-block">
                                This is the image attendees will see at the top of your listing.
                                </div>
                            </div>
                        </div>
                        <TextField
                                label="Select Image from Computer"
                                variant="filled"
                                placeholder="Enter a venue or address"
                                inputProps={
                                    {
                                        height: 60,
                                        padding: '18px 12px 6px',
                                        backgroundColor: "white",
                                        border: '.5px solid rgb(188, 188, 188)',
                                        borderRadius: '2px',
                                        fontSize: '14px'
                                    }
                                }
                                InputProps={{disableUnderline: true}}
                                sx={{width: '60%'}}
                                InputLabelProps={{ shrink: true }}
                                type="file"
                                onChange={handleFile}
                                
                                />
                        <br />
                        <br />
                        <div id="ticket-info-container" className="form-block">
                            <div id="ticket-info-header" className="details-block">
                                <div id="ticket-info-header" className="header-block">
                                    Tickets
                                </div>
                                <div id="ticket-info-sub-header" className="sub-header-block">
                                Specify how many attendees will be allowed at your event. Select a price attendees will pay.
                                </div>
                            </div>
                        </div>
                        <div className="date-time-block">
                            <TextField
                                label="Total tickets allowed"
                                variant="filled"
                                placeholder="Enter a number"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                sx={{width: '49.5%'}}
                                InputLabelProps={{ shrink: true }}
                                type="number"
                                onChange={(e) => {setTotalTickets(e.target.value)}}
                                value={totalTickets}
                                required
                                />

                            <TextField
                                label="Price of ticket"
                                variant="filled"
                                placeholder="Enter a venue or address"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                sx={{width: '49.5%'}}
                                InputLabelProps={{ shrink: true }}
                                type="number"
                                onChange={(e) => {setPrice(e.target.value)}}
                                value={price}
                                required
                                />
                        </div>
                        <br />
                        <br />
                        <div className="buttons-container">
                            <div className="discard-button" onClick={handleDiscard}>
                                Discard
                            </div>
                            <button type="submit" className="form-submit-button">Edit Event</button>
                        </div>
                    </form>
                </div>
            </div>        
        </div>
    )
};

export default EventFormEdit;