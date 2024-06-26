// src/components/Login.tsx

import React from 'react';
import './login.css';
import { LoginComponentProps } from '../../types';

const Login: React.FC<LoginComponentProps> = ({login, onEmailChange, onPasswordChange, emailText, passwordText}) => {
    return (
        <div className="gogo-login-container">
            <div className="gogo-login-card">
                <h2 className="gogo-login-title">Login as Admin</h2>
                <form className="gogo-login-form">
                    <div className="gogo-login-form-group">
                        <label htmlFor="email" className="gogo-login-label">Email</label>
                        <input type="email" id="email" className="gogo-login-input" value={emailText} placeholder="Enter your email" required onChange={onEmailChange}/>
                    </div>
                    <div className="gogo-login-form-group">
                        <label htmlFor="password" className="gogo-login-label">Password</label>
                        <input type="password" id="password" value={passwordText} className="gogo-login-input" placeholder="Enter your password" required onChange={onPasswordChange}/>
                    </div>
                    <button type="submit" className="gogo-login-button" onClick={login}>Login</button>
                </form>
                <div className="gogo-login-footer">
                    <a href="/forgot-password" className="gogo-login-link">Forgot Password? Contact us</a>
                    {/* <a href="/register" className="gogo-login-link">Create an Account</a> */}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Login);
