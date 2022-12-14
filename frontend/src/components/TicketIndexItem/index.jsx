import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './TicketIndexItem.css'

const TicketIndexItem = ({ticketId}) => {
    const history = useHistory();
    const ticket = useSelector(state => state.tickets[ticketId])
    const event = useSelector(state => state.events[ticket.eventId])

    const shortDate = (dateTime) => {
        let change = new Date(dateTime)
        return change.toDateString();
    }

    const formatDate = (dateTime) => {
        let change = new Date(dateTime)
        return `${change.toDateString()} at ${change.toLocaleTimeString('en-US', { hour: "numeric", minute: "2-digit"})}`
    }

    const getDay = (dateTime) => {
        let change = new Date(dateTime);
        return change.getUTCDate();
    }

    const getMonth = (dateTime) => {
        let change = new Date(dateTime);
        return change.toLocaleString('en-US', { month: 'short' });
    }

    return (
        <div id='ticket-index-item-container' onClick={() => history.push(`/tickets/${ticketId}`)}>
            <div id='tii-abrev-date-cont'>
                <div className='month-abrev'>
                    {getMonth(event.startDate)}
                </div>
                <div className='date-abrev'>
                    {getDay(event.startDate)}
                </div>
            </div>
            <div className='event-thumbnail-mp-page-container'>
                <div id='ticket-img-actual'>
                    <img src={event.photoUrl} alt="pic" />
                </div>
            </div>
            <div className='event-detail-column-item'>
                <div className='title-mine' id='tii-title'>{event.title}</div>
                <div className='other-mine'>{formatDate(event.startDate)}</div>
                <div className='other-mine'>Free order placed on {shortDate(ticket.createdAt)}</div>
            </div>
        </div>
    )
}

export default TicketIndexItem;