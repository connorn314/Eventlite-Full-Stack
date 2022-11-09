import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { Redirect } from "react-router-dom";
import './EntryForm.css'
import lateralImage from '../../lateral-image-signup.jpeg'

const EntryFormPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const [otherEntryMethod, toggleEntryMethod] = useState("login")
    if (sessionUser) return <Redirect to="/" />;
    let EntryForm;
    if (otherEntryMethod === "login"){
        EntryForm = (
            <SignupFormPage />
        )
    } else {
        EntryForm = (
            <LoginFormPage />
        )
    }
    
    const handleClick = () => {
        if (otherEntryMethod === "login"){
            toggleEntryMethod("signup")
        } else {
            toggleEntryMethod("login")
        }
    }

    return (
        <div id="entry-form-split">
            <div id="form-side-container">
                <div id="form-container">
                    {EntryForm}
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