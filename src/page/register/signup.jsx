// src/components/Signup.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, DatePicker, Button, notification } from 'antd';
import './signup.css';
import { SELECTGENDER, VALIDEMAIL, REGNUMBER } from '../../utils/constants';
import { registerUser } from '../../services/customer_services';

const { Option } = Select;

const Signup = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const handleSignUp = async (values) => {
        setLoading(true);
        const response = await registerUser(values);
        setLoading(false);
        if (response.success) {
            navigate('/login', { state: { email: values.email } });
            notification.success({
                message: 'Success',
                description: response.message,
            });
        } else {
            notification.error({
                message: 'Error',
                description: response.message,
            });
        }
    };

    return (
        <div className='container-signup'>
            <div className='form-signup'>
                <h3 className='label-signup'>SIGN UP</h3>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSignUp}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                            {
                                pattern: REGNUMBER,
                                message: 'The input is not valid phone number!',
                            },
                        ]}
                    >
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your gender!',
                            },
                        ]}
                    >
                        <Select placeholder="Select a gender">
                            {SELECTGENDER.map(gender => (
                                <Option key={gender.id} value={gender.gender}>
                                    {gender.gender}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="dob"
                        label="Date of Birth"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your date of birth!',
                            },
                        ]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 8,
                                message: 'Password must be at least 8 characters!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirm_password"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                    <div className='signup-text'>
                        <p>By signing up you agree to our <a>Terms of Service and Privacy Policy</a></p>
                    </div>
                    <Form.Item className="signup-button-container">
                        <Button type="primary" htmlType="submit" loading={loading} className='btn-signup'>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </Form.Item>
                    <div className='signup-text'>
                        <p>Already have an account? <a onClick={() => navigate('/login')}>Sign In</a></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
