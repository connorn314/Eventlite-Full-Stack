import { useState } from 'react';
import { useSelector } from 'react-redux';
import './TicketFormCreate.css'

const TicketFormCreate = ({eventId, showForm, setShowForm}) => {
    
    const eventOfInterest = useSelector(state => state.events[eventId]);
    const [cart, setCart] = useState({});

    const handleClose = () => {
        setShowForm(false)
        document.body.style.overflow = 'unset'
    }

    let cartContents = (Object.values(cart).length > 0) ? (
        <div>
            We have items in cart
        </div>
    ) : (
        <div id='empty-cart-container'>
            <span className="material-symbols-rounded" id='shopping-icon'>shopping_cart</span>
        </div>
    )
    
    return (
        <>
            {showForm && (
                <div id='ticket-create-form-page-container'>
                    <div id='ticket-create-form-container'>
                        <div id="leave-ticket-form" onClick={handleClose}>
                            <span className="material-symbols-rounded" id='close-tickets-icon'>close</span>
                        </div>
                        <div id='left-side-ticket-container'>
                            {eventId} is the Event!
                            <div id='tickets-event-header-container'>
                                <div id="tickets-event-title">
                                    {eventOfInterest.title}
                                </div>
                            </div>
                            <div id='tickets-add-container'>

                            </div>
                            <div id='checkout-footer-container'>

                            </div>
                        </div>
                        <div id='right-side-ticket-container'>
                            <div id='ticket-event-img-cont'>
                                <img src={eventOfInterest.photoUrl} alt="necessary" />
                            </div>
                            <div id='cart-container'>
                                {cartContents}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default TicketFormCreate;