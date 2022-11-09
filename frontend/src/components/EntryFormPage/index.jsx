import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { Redirect, useParams } from "react-router-dom";
import './EntryForm.css'
import lateralImage from '../../lateral-image-signup.jpeg'
import { useEffect } from "react";
import * as sessionActions from '../../store/session'

const EntryFormPage = () => {
    const {formId} = useParams();
    const startingPage = formId == 1 ? "Log in" : "Sign up"
    const sessionUser = useSelector(state => state.session.user);
    const [otherEntryMethod, toggleEntryMethod] = useState(startingPage)
    const dispatch = useDispatch();

    useEffect(() => {
        toggleEntryMethod(startingPage)
    }, [formId])
    
    
    if (sessionUser) return <Redirect to="/" />;
    let EntryForm;
    if (otherEntryMethod === "Log in"){
        EntryForm = (
            <SignupFormPage />
        )
    } else {
        EntryForm = (
            <LoginFormPage />
        )
    }
    
    const handleClick = () => {
        if (otherEntryMethod === "Log in"){
            toggleEntryMethod("Sign up")
        } else {
            toggleEntryMethod("Log in")
        }
    }

    const handleDemoLogin = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ 
            credential: 'Demo-lition', 
            password: 'password' 
        }))
    }

    return (
        <div id="entry-form-split">
            <div id="form-side-container">
                <div id="form-container">
                    {EntryForm}
                    <div id="split-container">
                        <div className="side-lines"/>
                        <div id="or-container">
                            or
                        </div>
                        <div className="side-lines"/>
                    </div>
                    <div id="demo-user-container" onClick={handleDemoLogin}>
                        Demo user log in
                    </div>
                    <div id="switcher-container">
                        <p onClick={handleClick} id='form-switcher'>{otherEntryMethod}</p>
                    </div>
                </div>
            </div>

            <div id="image-side-container">
                <img src={lateralImage} alt="side-image" id="side-image"/>
            </div>
        </div>   
    )
}

export default EntryFormPage