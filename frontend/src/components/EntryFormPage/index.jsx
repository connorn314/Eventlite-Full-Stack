import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { Redirect, useParams } from "react-router-dom";
import './EntryForm.css'
import lateralImage from '../../lateral-image-signup.jpeg'
import { useEffect } from "react";

const EntryFormPage = () => {
    const {formId} = useParams();
    const startingPage = formId == 1 ? "Log in" : "sign up"
    const sessionUser = useSelector(state => state.session.user);
    const [otherEntryMethod, toggleEntryMethod] = useState(startingPage)

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
                    <div id="demo-user-container">
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