import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import{ TextField } from '@mui/material'

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
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
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
            <ul>
                {/* {errors.map(error => <li key={error}>{error}</li>)} */}
            </ul>
            <TextField
                label="Email address"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />
            <br/>
            <br/>
            <TextField
                label="Username"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

            <br/>
            <br/>
            <TextField
                label="Password"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <br/>
            <br/>
            <TextField
                label="Password"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <br/>
            <br/>
            <button type="submit">Sign Up</button>
        </form>
        </div>
    );
}

export default SignupFormPage;