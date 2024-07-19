import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { requestRecoverPassword, sendVerfyOTP, resetPassword } from "../../services/account_services";

import { Form, Input, Button, message, Space } from "antd";
import Logo from '../../assets/icons/nintendo.svg';
import "./password.css";

export default function PasswordRecover() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [resendOtpTimeout, setResendOtpTimeout] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let timer;
        if (resendOtpTimeout > 0) {
            timer = setInterval(() => {
                setResendOtpTimeout((prev) => prev - 1);
            }, 1000);
        }
        if (!email) {
            setStep(1)
        }
        return () => clearInterval(timer);
    }, [resendOtpTimeout]);

    const handleEmailSubmit = async (values) => {
        setIsLoading(true)
        setEmail(values.email);
        const response = await requestRecoverPassword({ email: values.email })
        setIsLoading(false)
        if (response.success) {
            setStep(2);
            message.success('OTP sent to your email');
            setResendOtpTimeout(60)
        } else {
            message.error('Failed to send OTP');
        }
    };

    const handleOtpSubmit = async (values) => {
        setIsLoading(true)
        const requestData = {
            email: email,
            otp: values.otp
        }
        const response = await sendVerfyOTP(requestData)
        setIsLoading(false)
        if (response.success) {
            setStep(3);
            message.success('OTP verified');
        } else {
            message.error('Invalid OTP');
        }
    };

    const handlePasswordSubmit = async (values) => {
        setIsLoading(true)
        const newPassword = {
            email: email,
            newPass: values.password
        }
        const response = await resetPassword(newPassword)
        setIsLoading(false)
        if (response.success) {
            message.success('Password reset successful');
            navigate('/login');
        } else {
            message.error('Failed to reset password');
        }
    };

    const handleResendOtp = async () => {
        const response = await requestRecoverPassword({ email: email });
        if (response.success) {
            message.success('OTP resent to your email');
            setResendOtpTimeout(60);
        } else {
            message.error('Failed to resend OTP');
        }
    };

    const validatePasswords = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords do not match!'));
        },
    });

    return (
        <>
            <header className="header-password">
                <div className="brand">
                    <div onClick={() => navigate('/')} className="logo-brand-p">
                        <img className="img-logo" src={Logo} alt="logo" />
                    </div>
                </div>
                <p className="text-header">Nintendo Account</p>
            </header>
            <div className="password-container">
                <h2>Reset password</h2>
                <p className="password-label">Please enter the e-mail address registered to your account, and then select Submit.
                    <br /> An e-mail will be sent to that address containing a OTP to reset your password.</p>
                {step === 1 && (
                    <Form className="form-pass" layout="vertical" onFinish={handleEmailSubmit}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={isLoading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                )}
                {step === 2 && (
                    <Form className="form-pass-otp" layout="vertical" onFinish={handleOtpSubmit}>
                        <Form.Item
                            label="OTP"
                            name="otp"
                            rules={[{ required: true, message: 'Please input the OTP sent to your email!' }]}
                        >
                            <Input.OTP />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button loading={isLoading} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button
                                    onClick={handleResendOtp}
                                    disabled={resendOtpTimeout > 0}
                                >{resendOtpTimeout > 0 ? `Resend OTP in ${resendOtpTimeout}s` : 'Resend OTP'}
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                )}
                {step === 3 && (
                    <Form className="form-pass" layout="vertical" onFinish={handlePasswordSubmit}>
                        <Form.Item
                            label="New Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your new password!' },
                                validatePasswords
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={isLoading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </>
    );
}
