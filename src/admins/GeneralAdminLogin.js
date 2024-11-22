import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GeneralAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'generaladmin@example.com' && password === 'generaladminpassword') {
            alert('Login successful');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>General Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <div>
                Don't have an account? <Link to="/generaladmin/register">Register</Link>
            </div>
        </div>
    );
};

export default GeneralAdminLogin;
