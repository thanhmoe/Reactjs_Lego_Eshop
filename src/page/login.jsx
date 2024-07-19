import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../../public/assets/bg.jpg';
import { notify } from '../main';
import './login.css';
import { fetchCustomers } from '../services/customer_services';
import { setToken, getTokenToRedirect, removeTokenToRedirect, setTokenForRememberUser, getTokenForRememberUser, removeTokenForRememberUser } from '../utils/token_utils';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [isCheck, setIsCheck] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });

    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
        // Load email from localStorage if it exists
        const rememberedEmail = getTokenForRememberUser();
        if (rememberedEmail) {
            setUser((prevUser) => ({
                ...prevUser,
                email: rememberedEmail
            }));
            setIsCheck(true);
        }
        if (location.state && location.state.email) {
            setUser((prevUser) => ({
                ...prevUser,
                email: location.state.email
            }));
        }
    }, [location.state]);


    const validate = () => {
        let tempErrors = { email: '', password: '', general: '' };
        let isValid = true;
        if (!user.email) {
            tempErrors.email = 'Email is required';
            isValid = false;
        }
        if (!user.password) {
            tempErrors.password = 'Password is required';
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
    };
    const handleChange = (type, value) => {
        setUser({
            ...user,
            [type]: value
        });
        setErrors({
            ...errors,
            [type]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await fetchCustomers(user);
            if (response.success) {
                setToken(response.data.auth_token);
                const url = getTokenToRedirect();
                removeTokenToRedirect();
                if (isCheck) {
                    setTokenForRememberUser(user.email)
                } else {
                    removeTokenForRememberUser();
                }
                navigate(url);
            } else {
                setErrors({
                    ...errors,
                    general: 'Incorrect email or password'
                });
            }
        }
    };

    return (
        <div className='container'>
            <img className='backgroundImage' src={backgroundImage} alt="" />
            <div className='formLogin'>
                <h2 className='decs'>LOGIN TO X</h2>
                <p className='decs'>Become a W3Schooler</p>
                <div className='form-group-login'>
                    <input
                        className='forminput-login'
                        placeholder='Your Email'
                        type="text"
                        value={user.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                    {errors.email && <span className='form-message'>{errors.email}</span>}
                    <input
                        className='forminput-login'
                        type="password"
                        placeholder='Your Password'
                        value={user.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                    />
                    {errors.password && <span className='form-message'>{errors.password}</span>}
                    {errors.general && <span className='form-message'>{errors.general}</span>}
                    <div>
                        <input
                            type='checkbox'
                            checked={isCheck}
                            onChange={(e) => setIsCheck(e.target.checked)}
                        />
                        <label htmlFor="checkbox"> Remember Me</label>
                    </div>
                    <div className='btn-group-login'>
                        <button className='btnLogin' onClick={handleSubmit}>Login
                        </button>
                        <button onClick={() => navigate('/forgot-password')} className='btn-forgot'>Forgot Password?</button>
                    </div>
                    <div className='login-text'>
                        <p>Don't have an account? <a className='signup-text' onClick={() => navigate('/signup')}>Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;