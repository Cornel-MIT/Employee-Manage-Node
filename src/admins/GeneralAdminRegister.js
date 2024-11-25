import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../backend/firebase';
import './GeneralAdminRegister.css';  

const GeneralAdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User registered:', user);
            alert('General Admin registered successfully');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'An error occurred during registration');
        }
    };

    return (
        <div className="general-admin-register">
            <h2>General Admin Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input
                        className="register-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        className="register-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        className="register-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div>
                    <button className="register-button" type="submit">Register</button>
                </div>
            </form>
            <div className="login-link">
                Already have an account? <Link to="/generaladmin/login">Login</Link>
            </div>
        </div>
    );
};

export default GeneralAdminRegister;
