import React from "react";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux"; 
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import './EventFormCreate.css'
import { Redirect } from "react-router-dom";


const EventFormCreate = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [price, setPrice] = useState(0);
    const [ticketsAllotted, setTicketsAllotted] = useState(100);
    // const event = useSelector(state => state.events)
    
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
            title,
            description,
            location,
            startDate: parseDate(startDate, startTime),
            endDate: parseDate(endDate, endTime),
            price,
            ticketsAllotted,
            photoFile
        }

        return dispatch(eventActions.createEvent(obj))
            .then(data => {
                console.log(data)
                history.push(`/events/${Object.values(data)[0].id}`)
            })
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
        <div id="create-event-page-container">
            <div id="create-event-page">
                <h2 className="form-title-black">Create Event</h2>
                <ul>
                    {Object.values(errors).flat().map(error => <li key={error}>{error}</li>)}
                </ul>
                <div id="create-form-container">
                    <div id="all-event-create-icons" className="icon-container">
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

                    <form onSubmit={handleSubmit} id="create-event-form-actual">
                        <div id="basic-info-container" className="form-block">
                            <div id="basic-info-header" className="details-block">
                                <div id="bi-header" className="header-block">
                                    Basic info
                                </div>
                                <div id="bi-sub-header" className="sub-header-block">
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
                            
                        
                        <br />
                        <br />

                        <div id="location-container" className="form-block">
                            <div id="location-header" className="details-block">
                                <div id="loaction-header" className="header-block">
                                    Location
                                </div>
                                <div id="loaction-sub-header" className="sub-header-block">
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

                        <div id="date-time-container" className="form-block">
                            <div id="date-time-header" className="details-block">
                                <div id="date-time-header" className="header-block">
                                    Date and time
                                </div>
                                <div id="date-time-sub-header" className="sub-header-block">
                                    Tell event-goers when your event starts and ends so they can make plans to attend.
                                </div>
                            </div>
                        </div>
                        <div className="date-time-block">
                            <TextField
                                label="Event Starts"
                                variant="filled"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                sx={{width: '49.5%'}}
                                InputLabelProps={{ shrink: true }}
                                type="date"
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startDate}
                                required
                                />
                            <TextField
                                label="Start Time"
                                variant="filled"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                sx={{width: '49.5%'}}
                                InputLabelProps={{ shrink: true }}
                                type="time"
                                onChange={(e) => setStartTime(e.target.value)}
                                value={startTime}
                                required
                                />
                        </div>
                        <br />
                        <div className="date-time-block">
                            <TextField
                                label="Event Ends"
                                variant="filled"
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
                        <br />
                        <br />
                        <div id="create-photo-container" className="form-block">
                            <div id="create-photo-header" className="details-block">
                                <div id="create-photo-header" className="header-block">
                                    Main event image
                                </div>
                                <div id="create-photo-sub-header" className="sub-header-block">
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
                                required
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
                                label="Total tickets allotted"
                                variant="filled"
                                placeholder="Enter a number"
                                inputProps={{style}}
                                InputProps={{disableUnderline: true}}
                                sx={{width: '49.5%'}}
                                InputLabelProps={{ shrink: true }}
                                type="number"
                                onChange={(e) => {setTicketsAllotted(e.target.value)}}
                                value={ticketsAllotted}
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
                            <button type="submit" className="form-submit-button">Create Event</button>
                        </div>
                    </form>
                </div>
            </div>        
        </div>
    )
};

export default EventFormCreate;