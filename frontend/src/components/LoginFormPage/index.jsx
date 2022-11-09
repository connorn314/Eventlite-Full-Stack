import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import './LoginForm.css'


const LoginFormPage = () => {

    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
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
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
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



    return (
        <div id="login-form">
            <div id='login-title' className="user-auth-titles">
                <h1>Log in</h1>
            </div>
            <div id="login-actual-form">
                <form onSubmit={handleSubmit} className='user-forms'>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <TextField
                        label="Email address"
                        variant="filled"
                        inputProps={{
                            style
                        }}
                        InputProps={{
                            disableUnderline: true
                        }}
                        // color={'rgba(0, 0, 0, 0)'}
                        InputLabelProps={{ shrink: true }}
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                    <div className="spacer-container"/>

                    <TextField
                        label="Password"
                        variant="filled"
                        inputProps={{style}}
                        InputProps={{
                            disableUnderline: true
                        }}
                        InputLabelProps={{ shrink: true }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit" className='user-auth-button'>Log In</button>
                </form>
            </div>
        </div>
    );

}

export default LoginFormPage