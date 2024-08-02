import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Form, Input, Button, Checkbox, notification, Space } from 'antd';
import './login.css';

import { useTranslation } from 'react-i18next';

import { fetchCustomers } from '../services/customer_services';
import {
    setToken, getTokenToRedirect,
    removeTokenToRedirect,
    setTokenForRememberUser,
    getTokenForRememberUser,
    removeTokenForRememberUser
} from '../utils/token_utils';
import { notify } from '../main';

const Login = () => {
    const { t } = useTranslation(['login'])
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
            const url = getTokenToRedirect() || '/';
            removeTokenToRedirect();
            notify('success', t('You_been_login'))
            if (isCheck) {
                setTokenForRememberUser(values.email);
            } else {
                removeTokenForRememberUser();
            }
            navigate(url);
        } else {
            notification.error({
                message: t('Error'),
                description: t('Incorrect_Email_Or_Password'),
            });
        }
    };

    return (
        <div className='container-login'>
            <div className='form-login'>
                <h3 className='label-login'>{t('LOGIN_Label')}</h3>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleLogin}
                >
                    <Form.Item
                        name="email"
                        label={t('Email')}
                        rules={[
                            {
                                required: true,
                                message: t('Please_Input_Your_Email'),
                            },
                            {
                                type: 'email',
                                message: t('Invalid_Email'),
                            },
                        ]}
                    >
                        <Input placeholder={t('Email')} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={t('Password')}
                        rules={[
                            {
                                required: true,
                                message: t('Please_Input_Your_Password'),
                            },
                            {
                                min: 8,
                                message: t('Password_At_Least_8_Characters')
                            }
                        ]}
                    >
                        <Input.Password placeholder={t('Password')} />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox
                            checked={isCheck}
                            onChange={(e) => setIsCheck(e.target.checked)}
                        >
                            {t('Remember_Me')}
                        </Checkbox>
                    </Form.Item>
                    <Form.Item className='signin-button-container'>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading} className='btn-login'>
                                {loading ? t('Logging_In') : t('Login_Button')}
                            </Button>
                            <Button onClick={() => navigate('/forgot-password')} className='btn-forgot'>
                                {t('Forgot_Password')}
                            </Button>
                        </Space>
                    </Form.Item>
                    <div className='login-text'>
                        <p>{t('Dont_Have_An_Account')} <a onClick={() => navigate('/signup')}>{t('Sign_Up')}</a></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
