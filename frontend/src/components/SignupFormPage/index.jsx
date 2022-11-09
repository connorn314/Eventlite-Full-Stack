import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import '../LoginFormPage/LoginForm.css'
import{ Backdrop, TextField, withTheme } from '@mui/material'
import { color } from "@mui/system";

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const style = {
        height: 22,
        padding: '18px 12px 6px',
        backgroundColor: "white",
        border: '.5px solid rgb(188, 188, 188)',
        borderRadius: '2px'
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
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
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div id="signup-form">
            <div id="signup-title" className="user-auth-titles">
                <h1>Create an account</h1>
            </div>
            <div id="signup-actual-form">
                <form onSubmit={handleSubmit} className="user-forms">
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <TextField
                        label="Email address"
                        variant="filled"
                        className="user-input-box"
                        inputProps={{style}}
                        InputProps={{
                            disableUnderline: true
                        }}
                        InputLabelProps={{ shrink: true }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    <div className="spacer-container"/>
                    
                    <TextField
                        label="Username"
                        variant="filled"
                        className="user-input-box"
                        inputProps={{style}}
                        InputProps={{
                            disableUnderline: true
                        }}
                        InputLabelProps={{ shrink: true }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <div className="spacer-container"/>


                    <TextField
                        label="Password"
                        variant="filled"
                        className="user-input-box"
                        inputProps={{style}}
                        InputProps={{
                            disableUnderline: true
                        }}
                        InputLabelProps={{ shrink: true }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="spacer-container"/>


                    <TextField
                        label="Confirm password"
                        variant="filled"
                        className="user-input-box"
                        inputProps={{style}}
                        InputProps={{
                            disableUnderline: true
                        }}
                        InputLabelProps={{ shrink: true }}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />

                    <button type="submit" className='user-auth-button'>Continue</button>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;