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
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                    <TextField
                        label="Email address"
                        variant="filled"
                        inputProps={{
                            style: {
                                height: 22,
                                width: 332,
                                padding: '18px 12px 6px'
                            }
                        }}
                        // color={'rgba(0, 0, 0, 0)'}
                        InputLabelProps={{ shrink: true }}
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                <br />
                <br />
                
                    <TextField
                        label="Password"
                        variant="filled"
                        inputProps={{
                            style: {
                                height: 22,
                                width: 332,
                                padding: '18px 12px 6px'
                            }
                        }}
                        InputLabelProps={{ shrink: true }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                <br />
                <br />
                
                <button type="submit">Log In</button>
            </form>
        </div>
    );

}

export default LoginFormPage