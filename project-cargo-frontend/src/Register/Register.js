import React, { useState } from 'react';
import Navbar from "../global/navbar";
import axios from 'axios';

export const Register = () => {
    const [user, setUser] = useState({
        username: '',
        realName: '',
        password: '',
        email: '',
        joinDate: new Date().toISOString().slice(0,10)
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const register = () => {
        axios.post('http://localhost:3000/register', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    };

    return (
        <div className='App'>
            <Navbar />
            <div className="register">
                <h2>Register</h2>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="text" name="realName" placeholder="Real Name" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <button onClick={register}>Register</button>
            </div>
        </div>
    );
};