import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import './TicketShowPage.css'

const TicketShowPage = () => {
    const { ticketId } = useParams();
    const ticket = useSelector(state => state.tickets[ticketId])
    const event = useSelector(state => state.events[ticket.eventId])
    return (
        <div id='tsp-page-container'>
            <div id='tsp-page-content-container'>            
                <div id='tsp-top-level-container'>
                    <div id='leave-section-container'>
                        <div id='leave-ticket-show' >
                            <span class="material-symbols-outlined">arrow_back</span>
                        </div>
                        <div>
                            Back to Current Orders
                        </div>
                    </div>
                    <div id='tsp-event-title-container'>
                        <div id='tsp-event-title'>
                            Order for {event.title}
                        </div>
                    </div>
                    <div id='tsp-mini-order-details'>
                        <div>
                            Free order on {ticket.createdAt}
                        </div>
                        <div>
                            Order details: {event.startDate}
                        </div>
                        <div>
                            {event.location}
                        </div>
                    </div>
                </div>
                <div id='tsp-low-level-container'>
                    <div id='tsp-button-container'>
                        <div className="discard-button" >
                            Cancel Order
                        </div>
                    </div>
                    <div id="tsp-order-details-container">
                        <div>
                            Individual Admission
                        </div>
                        <div>
                            <div>Contact Information</div>
                            <div className='contact-info-pair'>
                                <div>First Name</div>
                                <div>{ticket.name}</div>
                            </div>
                            <div className='contact-info-pair'>
                                <div>Last Name</div>
                                <div>{ticket.name}</div>
                            </div>
                            <div className='contact-info-pair'>
                                <div>Email</div>
                                <div>{ticket.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketShowPage