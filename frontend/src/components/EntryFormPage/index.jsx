import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { Redirect } from "react-router-dom";
import './EntryForm.css'

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
            <div>
            {EntryForm}
            <br />
            <br />
            <button onClick={handleClick}>{otherEntryMethod}</button>
            </div>

            <div>
                <h2>Img Here</h2>
            </div>
        </div>   
    )
}

export default EntryFormPage