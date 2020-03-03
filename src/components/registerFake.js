import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const RegisterFake = props => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/users/register', credentials)
            .then(res => {
                window.localStorage.setItem('token', res.data.payload);
                props.history.push('/');
            })
            .catch(err => {
                console.log(`Registration error: ${err}`);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='name'
                    name='name'
                    value={credentials.name}
                    label='name'
                    onChange={handleChange}
                    className='input'
                />

                <input
                    type='text'
                    placeholder='email'
                    name='email'
                    value={credentials.email}
                    label='email'
                    onChange={handleChange}
                    className='input'
                />
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    value={credentials.password}
                    label='password'
                    onChange={handleChange}
                    className='input'
                />

                <button className='start'>Login</button>
            </form>
        </div>
    );
};

export default RegisterFake;
