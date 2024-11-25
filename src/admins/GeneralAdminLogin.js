import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, db, doc } from '../backend/firebase';
import './GeneralAdminLogin.css';

const GeneralAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Logging in with:', email, password);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Optional: Retrieve additional user data from Firestore
            const userDocRef = doc(db, 'admins', user.uid);
            console.log('Logged in user:', user.email);

            // Navigate to the dashboard or management page
            navigate('/employee-management');
        } catch (error) {
            console.error('Login error:', error.message);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="general-admin-login">
            <h2>General Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        className="login-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div>
                    <button className="login-button" type="submit">
                        Login
                    </button>
                </div>
            </form>
            <div className="register-link">
                Don't have an account? <Link to="/generaladmin/register">Register</Link>
            </div>
        </div>
    );
};

export default GeneralAdminLogin;
