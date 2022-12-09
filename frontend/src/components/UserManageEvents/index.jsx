import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './UserManageEvents.css'
import * as eventActions from '../../store/event'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const UserManageEventsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const events = useSelector(state => state.events);
    const sessionUser = useSelector(state => state.session.user)
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        dispatch(eventActions.getEventsData());
    }, [])

    if (!sessionUser) return <Redirect to="/" />;
    const formatDate = (dateTime) => {
        let change = new Date(dateTime)
        return change.toDateString()
    }
    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        const direction = String(e.target);
        console.log(direction)
        setAnchorEl(null);
    };

    return (
        <div id='user-events-index-page-container'>
            <div id='user-events-index-container'>
                <div id='user-events-header'>
                    Events
                </div>
                <div id='my-events-table-container'>
                    <div id='top-level-container'>
                        <div id='column-name-container'>
                            <div id='event-column-title'>
                                Event
                            </div>
                        </div>
                    </div>
                    {events && Object.values(events).map(event => {
                        if (sessionUser && sessionUser.id === event.authorId){
                            console.log(event.id)
                            return (
                                <div className='table-item-container' >
                                    <div className='left-info-container' onClick={() => history.push(`/events/${event.id}`)}>
                                        <div className='event-detail-column-item'>
                                            <div className='title-mine'>{event.title}</div>
                                            <div className='other-mine'>{formatDate(event.startDate)}</div>
                                            <div className='other-mine'>{event.location}</div>
                                        </div>
                                    </div>
                                    <div className='middle-info-container'>
                                        <div id='tickets-sold-count'>
                                            0/{event.ticketsAllotted}
                                        </div>
                                    </div>
                                    <div className='right-edit-container'>
                                    <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={open ? 'long-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                            style: {
                                                width: '20ch',
                                            },
                                            }}
                                        >
                                            <MenuItem key={"view"} onClick={() => history.push(`/events/${event.id}`)}>
                                                View
                                            </MenuItem>
                                            <MenuItem key={"edit"} onClick={() => history.push(`/events/${event.id}/edit`)}>
                                                Edit
                                            </MenuItem>
                                            <MenuItem key={"delete"} onClick={() => {
                                                dispatch(eventActions.deleteEvent(event.id))
                                                setAnchorEl(null);
                                                }}>
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                
            </div>
        </div>
    )
};

export default UserManageEventsPage;