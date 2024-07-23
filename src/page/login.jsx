// File: /src/components/Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Checkbox, notification, Space } from 'antd';
import backgroundImage from '../../public/assets/bg.jpg';
import './login.css';
import { fetchCustomers } from '../services/customer_services';
import { setToken, getTokenToRedirect, removeTokenToRedirect, setTokenForRememberUser, getTokenForRememberUser, removeTokenForRememberUser } from '../utils/token_utils';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    useEffect(() => {
        const rememberedEmail = getTokenForRememberUser();
        if (rememberedEmail) {
            form.setFieldsValue({ email: rememberedEmail });
            setIsCheck(true);
        }
        if (location.state && location.state.email) {
            form.setFieldsValue({ email: location.state.email });
        }
    }, [location.state, form]);

    const handleLogin = async (values) => {
        setLoading(true);
        const response = await fetchCustomers(values);
        setLoading(false);
        if (response.success) {
            setToken(response.data.auth_token);
            const url = getTokenToRedirect();
            removeTokenToRedirect();
            if (isCheck) {
                setTokenForRememberUser(values.email);
            } else {
                removeTokenForRememberUser();
            }
            navigate(url);
        } else {
            notification.error({
                message: 'Error',
                description: 'Incorrect email or password',
            });
        }
    };

    return (
        <div className='container-login'>
            <div className='form-login'>
                <h3 className='label-login'>LOGIN</h3>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleLogin}
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
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox
                            checked={isCheck}
                            onChange={(e) => setIsCheck(e.target.checked)}
                        >
                            Remember Me
                        </Checkbox>
                    </Form.Item>
                    <Form.Item className='signin-button-container'>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading} className='btn-login'>
                                {loading ? 'Logging In...' : 'Login'}
                            </Button>
                            <Button onClick={() => navigate('/forgot-password')} className='btn-forgot'>
                                Forgot Password?
                            </Button>
                        </Space>
                    </Form.Item>
                    <div className='login-text'>
                        <p>Don't have an account? <a onClick={() => navigate('/signup')}>Sign Up</a></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
