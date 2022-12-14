import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import * as ticketActions from '../../store/ticket';
import './TicketShowPage.css'

const TicketShowPage = () => {
    const { ticketId } = useParams();
    const ticket = useSelector(state => state.tickets[ticketId])
    const event = useSelector(state => state.events[ticket.eventId])
    const dispatch = useDispatch();
    const history = useHistory();
    const firstName = ticket.name.split(" ")[0]
    const lastName = ticket.name.split(" ")[1]
    const [cancelOrder, setCancelOrder] = useState(false);

    const shortDate = (dateTime) => {
        let change = new Date(dateTime)
        return change.toDateString();
    }

    const formatDate = (dateTime) => {
        let change = new Date(dateTime)
        return `${change.toDateString()} at ${change.toLocaleTimeString('en-US', { hour: "numeric", minute: "2-digit"})}`
    }

    const handleClose = () => {
        setCancelOrder(false)
        document.body.style.overflow = 'unset'
    }
    
    const handleDeleteTicket = () => {
        document.body.style.overflow = 'unset'
        dispatch(ticketActions.deleteTicket(ticketId))
        history.push('/profile')
    }

    return (
        <div id='tsp-page-container'>
            <div id='tsp-page-content-container'>            
                <div id='tsp-top-level-container'>
                    <div id='leave-section-container' onClick={() => history.push('/profile')}>
                        <div id='leave-ticket-show-cont'>
                            <span class="material-symbols-outlined" id='leave-ticket-show'>arrow_back</span>
                        </div>
                        <div id='back-to-orders'>
                            Back to Current Orders
                        </div>
                    </div>
                    <div id='tsp-event-title-container'>
                        <div id='tsp-event-title' onClick={() => history.push(`/events/${ticket.eventId}`)}>
                            Order for <span id='tsp-blue-title'>{event.title}</span>
                        </div>
                    </div>
                    <div id='tsp-mini-order-details'>
                        <div className='tsp-mini-detail'>Free order on {shortDate(ticket.createdAt)}</div>
                        <div className='tsp-mini-location'>Order details: <span className='tsp-mini-detail'>{formatDate(event.startDate)}</span></div>
                        <div className='tsp-mini-location'>{event.location}</div>
                    </div>
                </div>
                <div id='tsp-low-level-container'>
                    <div id='tsp-button-container'>
                        <div className="discard-button" id='cancel-order' onClick={() => {
                            document.body.style.overflow = 'hidden'
                            setCancelOrder(true)
                            }}>
                            Cancel Order
                        </div>
                        {cancelOrder && (
                            <div id='cancel-order-page-container'>
                            <div id='cancel-order-modal-container'>
                                <div id="leave-ticket-form" className='leave-cancel-order-modal' onClick={handleClose}>
                                    <span className="material-symbols-rounded" id='close-tickets-icon'>close</span>
                                </div>
                                <div id='cancel-order-title-container'>
                                    <div id='cancel-order-title'>
                                        Cancel Order
                                    </div>
                                </div>
                                <div id='cancel-order-question-container'>
                                    <div id='cancel-order-question'>
                                        Are you sure you want to cancel your order? 
                                    </div>
                                </div>

                                <div id='cancel-order-buttons-container'>
                                    <div className='discard-button' id='no-nevermind' onClick={() => {
                                        document.body.style.overflow = 'unset'
                                        setCancelOrder(false)
                                        }}>
                                        No, nevermind
                                    </div>
                                    <div className='form-submit-button' id='cancel-this-order' onClick={handleDeleteTicket}>
                                        Yes, cancel this order
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}

                    </div>
                    <div id="tsp-order-details-container">
                        <div id='ticket-quant'>
                            {`(${ticket.quantity}x) Individual Admission Ticket${ticket.quantity > 1 ? "s" : ""}`} 
                        </div>
                        <div id='contact-info-container'>
                            <div id='contact-info'>Contact Information</div>
                            <div className='contact-info-pair'>
                                <div className='contact-sub-header'>First Name</div>
                                <div className='contact-sub-detail'>{firstName}</div>
                            </div>
                            <div className='contact-info-pair'>
                                <div className='contact-sub-header'>Last Name</div>
                                <div className='contact-sub-detail'>{lastName}</div>
                            </div>
                            <div className='contact-info-pair'>
                                <div className='contact-sub-header'>Email</div>
                                <div className='contact-sub-detail'>{ticket.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketShowPage