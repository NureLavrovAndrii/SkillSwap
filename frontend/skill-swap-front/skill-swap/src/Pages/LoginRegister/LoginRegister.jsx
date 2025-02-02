import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { login, register } from '../../services/auth';

const LoginRegister = () => {

    const [action, setAction] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const registerlink = () => {
        setAction (' active');
    }

    const loginlink = () => {
        setAction (' ')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const data = await login(email, password);
            setMessage('Login successful! Redirecting...');
            setTimeout(() => window.location.href = '/', 2000); // Redirect after login
        } catch (err) {
            setError(err);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await register(name, email, password);
            setMessage('Registration successful! You can now log in.');
            setAction(''); // Switch to login form
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="login-body">
            <div className={`wrapper${action}`}>
                <div className="form-box login">
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        {error && <p className="error">{error}</p>}
                        {message && <p className="success">{message}</p>}

                        <div className="input-box">
                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FaLock className="icon" />
                        </div>

                        <div className="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                            <a href="#">Forgot password?</a>
                        </div>

                        <button type="submit">Login</button>

                        <div className="register-link">
                            <p>Don't have an account? <a href="#" onClick={registerlink}>Register</a></p>

                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1>Registration</h1>
                        {error && <p className="error">{error}</p>}
                        {message && <p className="success">{message}</p>}

                        <div className="input-box">
                            <input type="text" placeholder="Username" required value={name} onChange={(e) => setName(e.target.value)} />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FaLock className="icon" />
                        </div>

                        <div className="remember-forgot">
                            <label><input type="checkbox" />I agree to the terms & conditions</label>
                        </div>

                        <button type="submit">Register</button>

                        <div className="register-link">
                            <p>Already have an account? <a href="#" onClick={loginlink}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister