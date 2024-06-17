import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { SELECTGENDER, VALIDEMAIL, REGNUMBER } from '../../constants';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        gender: '',
        birthday: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => VALIDEMAIL.test(email);
    const validatePhoneNumber = (phoneNumber) => REGNUMBER.test(phoneNumber);
    const validatePassword = (password) => password.length >= 8;
    const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignUp = () => {
        const newErrors = {};

        if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
        if (!validatePhoneNumber(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
        if (!formData.gender) newErrors.gender = 'Select a gender';
        if (!formData.birthday) newErrors.birthday = 'Please select a birthday';
        if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters';
        if (!validateConfirmPassword(formData.password, formData.confirmPassword)) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate('/login');
        }
    };

    return (
        <div>
            <div className='container-signup'>
                <div className='form-signup'>
                    <h3 className='label-signup'>SIGN UP</h3>
                    <div className='form-group-signup'>
                        <div>
                            <input
                                className='forminput-signup'
                                placeholder='Email'
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <span className='error'>{errors.email}</span>}
                        </div>
                        <div>
                            <input
                                className='forminput-signup'
                                placeholder='Phone Number'
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                            {errors.phoneNumber && <span className='error'>{errors.phoneNumber}</span>}
                        </div>
                        <div className='forminput-other'>
                            <div className='gender-div'>
                                <select
                                    className='forminput-gender'
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value=''>Gender</option>
                                    {SELECTGENDER.map(gender => (
                                        <option key={gender.id} value={gender.gender}>
                                            {gender.gender}
                                        </option>
                                    ))}
                                </select>
                                {errors.gender && <span className='error'>{errors.gender}</span>}
                            </div>
                            <div className='birthday-div'>
                                <input
                                    type="date"
                                    id="birthday"
                                    className="birthday"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleInputChange}
                                />
                                {errors.birthday && <span className='error'>{errors.birthday}</span>}
                            </div>
                        </div>
                        <div>
                            <input
                                className='forminput-signup'
                                type="password"
                                placeholder='Password'
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <span className='error'>{errors.password}</span>}
                        </div>
                        <div>
                            <input
                                className='forminput-signup'
                                type="password"
                                placeholder='Confirm Password'
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
                        </div>
                        <div className='signup-text'>
                            <p>By signing up you agree to our <a>Terms of Service and Privacy Policy</a></p>
                        </div>
                        <div className='btn-group-signup'>
                            <button className='btn-signup' onClick={handleSignUp}>Sign Up</button>
                        </div>
                        <div className='signup-text'>
                            <p>Already have an account? <a onClick={() => navigate('/login')}>Sign In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
