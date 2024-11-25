import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SuperAdminLogin.css'; 

const SuperAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'superadmin@example.com' && password === 'superadminpassword') {
            alert('Login successful');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="super-admin-login">
            <h2>Super Admin Login</h2>
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
                    <button className="login-button" type="submit">Login</button>
                </div>
            </form>
            <div className="register-link">
                Don't have an account? <Link to="/superadmin/register">Register</Link>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
