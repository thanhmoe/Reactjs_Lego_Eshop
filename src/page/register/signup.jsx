import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, DatePicker, Button, notification } from 'antd';
import './signup.css';
import { SELECTGENDER, VALIDEMAIL, REGNUMBER } from '../../utils/constants';
import { registerUser } from '../../services/customer_services';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Signup = () => {
    const { t } = useTranslation(['signup']);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, '');
        form.setFieldsValue({ phone_number: numericValue });
    };

    const handleSignUp = async (values) => {
        setLoading(true);
        const response = await registerUser(values);
        setLoading(false);
        if (response.success) {
            navigate('/login', { state: { email: values.email } });
            notification.success({
                message: t('Success'),
                description: t(`Signup_Noti_${response.message}`),
            });
        } else {
            notification.error({
                message: t('Error'),
                description: t(`Signup_Noti_${response.message}`),
            });
        }
    };

    return (
        <div className='container-signup'>
            <div className='form-signup'>
                <h3 className='label-signup'>{t('Sign_Up_Label')}</h3>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSignUp}
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
                        name="phone_number"
                        label={t('Phone_Number')}
                        rules={[
                            {
                                required: true,
                                message: t('Please_Input_Your_Phone_Number'),
                            },
                            {
                                pattern: REGNUMBER,
                                message: t('Invalid_Phone_Number'),
                            },
                        ]}
                    >
                        <Input placeholder={t('Phone_Number')} onChange={handlePhoneNumberChange} />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label={t('Gender')}
                        rules={[
                            {
                                required: true,
                                message: t('Please_Select_Your_Gender'),
                            },
                        ]}
                    >
                        <Select placeholder={t('Gender')}>
                            {SELECTGENDER.map(gender => (
                                <Option key={gender.id} value={gender.gender}>
                                    {gender.gender}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="dob"
                        label={t('Date_Of_Birth')}
                        rules={[
                            {
                                required: true,
                                message: t('Please_Select_Your_Date_Of_Birth'),
                            },
                        ]}
                    >
                        <DatePicker style={{ width: '100%' }} />
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
                                message: t('Password_At_Least_8_Characters'),
                            },
                        ]}
                    >
                        <Input.Password placeholder={t('Password')} />
                    </Form.Item>
                    <Form.Item
                        name="confirm_password"
                        label={t('Confirm_Password')}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: t('Please_Confirm_Your_Password'),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t('Password_Mismatch')));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder={t('Confirm_Password')} />
                    </Form.Item>
                    <div className='signup-text'>
                        <p>{t('By_Signing_Up_You_Agree')} <a>{t('Terms_Of_Service')}</a> {t('and')} <a>{t('Privacy_Policy')}</a></p>
                    </div>
                    <Form.Item className="signup-button-container">
                        <Button type="primary" htmlType="submit" loading={loading} className='btn-signup'>
                            {loading ? t('Signing_Up') : t('Sign_Up_Button')}
                        </Button>
                    </Form.Item>
                    <div className='signup-text'>
                        <p>{t('Already_Have_An_Account')} <a onClick={() => navigate('/login')}>{t('Sign_In')}</a></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
