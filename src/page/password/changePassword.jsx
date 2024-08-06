import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from 'react-i18next';

import { changePassword } from "../../services/account_services";

import { clearToken } from "../../utils/token_utils";

import Logo from '../../assets/icons/nintendo.svg';
import "./password.css";
import { Button, Form, Input, message, notification, Result } from "antd";

export default function ChangePassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { t } = useTranslation('forgot_password');

    const validatePasswords = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(t('password_mismatch')));
        },
    });

    const FirstPageInfo = () => {
        return (
            <div>
                <h2>{t('change_password_title')}</h2>
                <p className="password-label">{t('change_password_instructions')}</p>
            </div>
        )
    }

    const handleChangePassword = async (value) => {
        setIsLoading(true);
        try {
            const res = await changePassword({
                old_pass: value.oldPassword,
                new_pass: value.password
            })
            if (res.success) {
                setIsSuccess(true)
                clearToken()
            } else {
                notification.error({
                    message: t('ChangePass_Error'),
                    description: t(`ChangePass_Noti_${res.message}`),
                })
            }
        } catch (error) {
            notification.error({
                message: t('ChangePass_Error'),
                description: t(`Password_change_error_message`),
            })
        } finally {
            setIsLoading(false)
        }
    }


    if (isSuccess) {
        return (
            <div className="password-container">
                <Result
                    status="success"
                    title={t('password_change_success_title')}
                    subTitle={t('password_change_success_subtitle')}
                    extra={[
                        <Button type="primary" key="login" onClick={() => navigate('/login')}>
                            {t('go_to_login')}
                        </Button>,
                    ]}
                />
            </div>
        );
    }

    return (
        <>
            <header className="header-password">
                <div className="brand">
                    <div onClick={() => navigate('/')} className="logo-brand-p">
                        <img className="img-logo" src={Logo} alt="logo" />
                    </div>
                </div>
                <p className="text-header">{t('nintendo_account')}</p>
            </header>
            <div className="password-container">
                <FirstPageInfo />
                <Form className="form-pass" layout="vertical" onFinish={handleChangePassword}>
                    <Form.Item
                        label={t('old_password_label')}
                        name="oldPassword"
                        rules={[
                            { required: true, message: t('old_password_required_message') },
                            { min: 8, message: t('password_length_message') }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

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
            </div>
        </>
    );
}
