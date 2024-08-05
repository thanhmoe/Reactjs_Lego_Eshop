import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestRecoverPassword, sendVerfyOTP, resetPassword } from "../../services/account_services";
import { Form, Input, Button, message, Space, Result, Steps } from "antd";
import Logo from '../../assets/icons/nintendo.svg';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from "../../components/LanguageDropdown";
import "./password.css";

export default function PasswordRecover() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [resendOtpTimeout, setResendOtpTimeout] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation('forgot_password');

    useEffect(() => {
        let timer;
        if (resendOtpTimeout > 0) {
            timer = setInterval(() => {
                setResendOtpTimeout((prev) => prev - 1);
            }, 1000);
        }
        if (!email) {
            setStep(0);
        }
        return () => clearInterval(timer);
    }, [resendOtpTimeout]);

    const handleEmailSubmit = async (values) => {
        setIsLoading(true);
        setEmail(values.email);
        const response = await requestRecoverPassword({ email: values.email });
        setIsLoading(false);
        if (response.success) {
            setStep(1);
            message.success(t('otp_sent_success'));
            setResendOtpTimeout(60);
        } else {
            message.error(t(`ERROR_${response.message}`));
        }
    };

    const handleOtpSubmit = async (values) => {
        setIsLoading(true);
        const requestData = { email: email, otp: values.otp };
        const response = await sendVerfyOTP(requestData);
        setIsLoading(false);
        if (response.success) {
            setStep(2);
            message.success(t('otp_verified'));
        } else {
            message.error(t('otp_invalid'));
        }
    };

    const handlePasswordSubmit = async (values) => {
        setIsLoading(true);
        const newPassword = { email: email, newPass: values.password };
        const response = await resetPassword(newPassword);
        setIsLoading(false);
        if (response.success) {
            setStep(3);
        } else {
            message.error(t('password_reset_failure'));
        }
    };

    const handleResendOtp = async () => {
        const response = await requestRecoverPassword({ email: email });
        if (response.success) {
            message.success(t('otp_resent_success'));
            setResendOtpTimeout(60);
        } else {
            message.error(t('otp_resent_failure'));
        }
    };

    const validatePasswords = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(t('password_mismatch')));
        },
    });

    const steps = [
        {
            title: t('step_email'), content: (
                <>
                    <div className="first-step-lable">
                        <h2>{t('reset_password_title')}</h2>
                        <p className="password-label">{t('reset_password_instructions')}</p>
                    </div>
                    <Form className="form-pass" layout="vertical" onFinish={handleEmailSubmit}>
                        <Form.Item
                            label={t('email_label')}
                            name="email"
                            rules={[
                                { required: true, message: t('email_required_message') },
                                { type: 'email', message: t('email_invalid_message') }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={isLoading} type="primary" htmlType="submit">
                                {t('submit_button')}
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )
        },
        {
            title: t('step_otp'), content: (
                <>
                    <Result
                        status="info"
                        title={t('check_your_email_title')}
                        subTitle={
                            <div>
                                <p>{t('otp_sent_message')}</p>
                                <p style={{ fontWeight: 'bold' }}>{email}</p>
                            </div>
                        }
                    />
                    <Form className="form-pass-otp" layout="vertical" onFinish={handleOtpSubmit}>
                        <Form.Item
                            label={t('otp_label')}
                            name="otp"
                            rules={[{ required: true, message: t('otp_required_message') }]}
                        >
                            <Input.OTP length={6} />
                        </Form.Item>
                        <Form.Item>
                            <div className="button-otp-group">
                                <Button loading={isLoading} type="primary" htmlType="submit">
                                    {t('submit_button')}
                                </Button>
                                <Button
                                    onClick={handleResendOtp}
                                    disabled={resendOtpTimeout > 0}
                                >
                                    {resendOtpTimeout > 0 ? `${t('resend_otp_in')} ${resendOtpTimeout}s` : t('resend_otp_button')}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </>
            )
        },
        {
            title: t('step_password'), content: (
                <>
                    <p className="password-label">{t('set_new_password_message')}</p>
                    <Form className="form-pass" layout="vertical" onFinish={handlePasswordSubmit}>
                        <Form.Item
                            label={t('new_password_label')}
                            name="password"
                            rules={[
                                { required: true, message: t('new_password_required_message') },
                                { min: 8, message: t('password_length_message') }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label={t('confirm_password_label')}
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: t('confirm_password_required_message') },
                                validatePasswords
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={isLoading} type="primary" htmlType="submit">
                                {t('submit_button')}
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )
        },
        {
            title: t('step_complete'), content: (
                <Result
                    status="success"
                    title={t('password_reset_success_title')}
                    extra={[
                        <Button onClick={() => navigate('/login')} type="primary">
                            {t('go_to_login_button')}
                        </Button>
                    ]}
                />
            )
        }
    ];

    return (
        <>
            <header className="header-password">
                <div className="brand">
                    <div onClick={() => navigate('/')} className="logo-brand-p">
                        <img className="img-logo" src={Logo} alt="logo" />
                    </div>
                </div>
                <LanguageDropdown />
            </header>
            <div className="password-container">
                <Steps style={{ maxWidth: '1000px' }} current={step} items={steps} />
                <div className="steps-content">{steps[step].content}</div>
            </div>
        </>
    );
}
