import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { SELECTGENDER, VALIDEMAIL, REGNUMBER } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterFetch, selectRegisterErrorState, selectRegisterState } from '../../redux/slice/account/userSlice';
import { notify } from '../../main';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectRegisterState);
    const errorSignUp = useSelector(selectRegisterErrorState);

    const [formData, setFormData] = useState({
        email: '',
        phone_number: '',
        gender: '',
        dob: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => VALIDEMAIL.test(email);
    const validatePhoneNumber = (phone_number) => REGNUMBER.test(phone_number);
    const validatePassword = (password) => password.length >= 8;
    const validateConfirmPassword = (password, confirm_password) => password === confirm_password;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignUp = async () => {
        const newErrors = {};
        if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
        if (!validatePhoneNumber(formData.phone_number)) newErrors.phone_number = 'Invalid phone number';
        if (!formData.gender) newErrors.gender = 'Select a gender';
        if (!formData.dob) newErrors.dob = 'Please select a birthday';
        if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters';
        if (!validateConfirmPassword(formData.password, formData.confirm_password)) newErrors.confirm_password = 'Passwords do not match';
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log('first stage');
            dispatch(userRegisterFetch(formData)).then((res) => {
                if(res.payload.status) {
                    navigate('/login', { state: { email: formData.email } })
                }
                notify('error', res.payload.message)
            });
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
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                            />
                            {errors.phone_number && <span className='error'>{errors.phone_number}</span>}
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
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                />
                                {errors.dob && <span className='error'>{errors.dob}</span>}
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
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                            />
                            {errors.confirm_password && <span className='error'>{errors.confirm_password}</span>}
                        </div>
                        <div className='signup-text'>
                            <p>By signing up you agree to our <a>Terms of Service and Privacy Policy</a></p>
                        </div>
                        <div className='btn-group-signup'>
                            <button className='btn-signup' onClick={handleSignUp} disabled={status === 'loading'}>
                                {status === 'loading' ? 'Signing Up...' : 'Sign Up'}</button>
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
