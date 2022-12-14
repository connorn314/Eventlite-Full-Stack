import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TicketFormCreate.css'
import { TextField } from "@mui/material";
import { useEffect } from 'react';
import * as ticketActions from '../../store/ticket';
import { useHistory } from 'react-router-dom';


const TicketFormCreate = ({eventId, showForm, setShowForm, formatDate, shortDate}) => {
    
    const eventOfInterest = useSelector(state => state.events[eventId]);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    // const [cart, setCart] = useState({});
    const [ticketQ, setTicketQ] = useState(0);
    const [checkout, setCheckout] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const userEmail = user ? user.email : ""
    const [email, setEmail] = useState(userEmail);

    useEffect(() => {
        setFirstName("")
        setLastName("")
        setErrors([])
    }, [checkout])
    
    const handleClose = () => {
        setShowForm(false)
        setErrors([])
        document.body.style.overflow = 'unset'
    }

    const handleCheckout = () => {
        setCheckout(true)
    }

    const handleSubmit = () => {
        const obj = {
            name: `${firstName} ${lastName}`,
            email,
            eventId,
            ownerId: user.id,
            quantity: ticketQ
        }
        return dispatch(ticketActions.createTicket(obj))
            .then(data => {
                document.body.style.overflow = 'unset'
                history.push(`/profile`)
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

    const handleDecrement = () => {
        if (ticketQ > 0) {
            setTicketQ(ticketQ - 1)
        }
    }

    const handleIncrement = () => {
        setTicketQ(ticketQ + 1)
    }

    const style = {
        height: 28,
        padding: '18px 12px 6px',
        backgroundColor: "white",
        border: '.5px solid rgb(188, 188, 188)',
        borderRadius: '2px',
        fontSize: '14px'
    }

    let cartContents = (ticketQ > 0) ? (
        <div id='receipt-container'>
            <div id='order-summary'>
                Order Summary
            </div>
            <div className='receipt-row' id='receipt-section-seperator'>
                <div>{ticketQ} x Individual Admission</div>
                <div>${(ticketQ * eventOfInterest.price).toFixed(2)}</div>
            </div>
            <div className='receipt-row'>
                <div>Subtotal</div>
                <div>${(ticketQ * eventOfInterest.price).toFixed(2)}</div>
            </div>
            <div className='receipt-row' id='receipt-section-seperator'>
                <div>Creator Discount</div>
                <div>${(ticketQ * eventOfInterest.price).toFixed(2)}</div>
            </div>
            <div className='receipt-row' id='total-section'>
                <div>Total</div>
                <div>$0.00</div>
            </div>
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
                            {checkout ? (
                                <>
                                    <div id='back-to-shopping' onClick={() => setCheckout(false)}>
                                        <span class="material-symbols-outlined">arrow_back</span>
                                    </div>
                                    <div id='tickets-event-header-container'>
                                        <div id="tickets-event-title">
                                            Checkout
                                        </div>
                                        <div id='tickets-event-date-time'>
                                            Take your time
                                        </div>
                                    </div>
                                </>
                            ):(
                                <div id='tickets-event-header-container'>
                                    <div id="tickets-event-title">
                                        {eventOfInterest.title}
                                    </div>
                                    <div id='tickets-event-date-time'>
                                        {formatDate(eventOfInterest.startDate)} — {formatDate(eventOfInterest.endDate)}
                                    </div>
                                </div>
                            )}
                            {checkout ? (
                                <div id='tickets-add-container'>
                                    <div id='tickets-add-content'>
                                        <div id='get-tickets-title'>
                                            Contact Information
                                        </div>
                                        <form id='create-tickets-form'>
                                            <br />
                                            <div className="date-time-block">
                                                <TextField
                                                    label="First Name"
                                                    variant="filled"
                                                    inputProps={{style}}
                                                    InputProps={{disableUnderline: true}}
                                                    sx={{width: '48%'}}
                                                    InputLabelProps={{ shrink: true }}
                                                    type="text"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    value={firstName}
                                                    required
                                                    />
                                                <TextField
                                                    label="Last Name"
                                                    variant="filled"
                                                    inputProps={{style}}
                                                    InputProps={{disableUnderline: true}}
                                                    sx={{width: '48%'}}
                                                    InputLabelProps={{ shrink: true }}
                                                    type="text"
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    value={lastName}
                                                    required
                                                    />
                                            </div>  
                                            <br />
                                            <TextField
                                                label="Email"
                                                variant="filled"
                                                placeholder="example@mail.com"
                                                inputProps={{style}}
                                                InputProps={{disableUnderline: true}}
                                                InputLabelProps={{ shrink: true }}
                                                type="text"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                required
                                                />            
                                        </form>
                                    <div>
                                        <ul>
                                            {Object.values(errors).map((error, i) => {
                                                return (
                                                    <li key={i}>{error}</li>
                                                )
                                            })}

                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            ) : (
                                <div id='tickets-add-container'>
                                    <div id='tickets-add-content'>
                                        <div id='get-tickets-title'>
                                            Tickets
                                        </div>
                                        <div id='individual-tickets-container'>
                                            <div id='title-and-add-header'>
                                                <div id='ticket-type-title'>
                                                    Individual Admission
                                                </div>
                                                <div id='ticket-quantity-container'>
                                                    <div id='decrement' className='quantity-button' onClick={handleDecrement}>
                                                        <span className="material-symbols-outlined" id='remove-ticket-icon'>remove</span>
                                                    </div>
                                                    <div id='quantity-count'>
                                                        {ticketQ}
                                                    </div>
                                                    <div id="increment" className='quantity-button' onClick={handleIncrement}>
                                                        <span className="material-symbols-outlined" id='add-ticket-icon'>add</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id='details-for-tickets-cont'>
                                                <div id='price-and-availability-row'>
                                                    <div id='price-ticket-container'>
                                                        ${eventOfInterest.price}
                                                    </div>
                                                    <div id='remaining-tickets'>
                                                        {(eventOfInterest.ticketsAllotted - eventOfInterest.ticketsSold)} Remaining
                                                    </div>
                                                </div>
                                                <div id='sales-end-container'>
                                                    Sales end on {shortDate(eventOfInterest.startDate)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {checkout ? (
                                <div id='checkout-footer-container'>
                                    <div id='checkout-button' className='form-submit-button' onClick={handleSubmit}>
                                        Register
                                    </div>
                                </div>
                            ) : (
                                <div id='checkout-footer-container'>
                                    <div id='checkout-button' className='form-submit-button' onClick={handleCheckout}>
                                        Check out
                                    </div>
                                </div>

                            )}
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