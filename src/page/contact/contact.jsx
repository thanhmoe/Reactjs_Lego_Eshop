// File: /src/components/Contact.js

import React, { useState } from "react";
import { JOBSELECT, VALIDEMAIL, REGNUMBER } from "../../utils/constants";
import { Modal, Form, Input, Select, Button, notification, Space } from "antd";
import { useTranslation } from "react-i18next";
import './contact.css';

const { TextArea } = Input;
const { Option } = Select;

export default function Contact() {
    const { t } = useTranslation(['contact'])
    const [isValid, setIsValid] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    // handle modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            handleOpen();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    // handle clear button
    const onClear = () => {
        form.resetFields();
    };

    return (
        <>
            <div className="formContact">
                <h3 className='decs-contact'>{t('Contact_Us')}</h3>
                <p className='decs-contact'>{t('You_Are_Welcome_To_Fill_In_The_Form_Below')}</p>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="jobselect"
                        label={t('Your_Current_Position')}
                    >
                        <Select placeholder={t('Choose_Your_Position')}>
                            {JOBSELECT.map(job => (
                                <Option value={job.jobName} key={job.id}>{t(job.jobName)}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="inputName"
                        label={t('Your_Name')}
                        rules={[
                            { required: true, message: 'Name cannot be empty' },
                            { max: 32, message: 'Limit input name is 32 characters' },
                        ]}
                    >
                        <Input placeholder={t('Enter_Your_Name_Here')} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={t('Email')}
                        rules={[
                            { required: true, message: 'Email cannot be empty' },
                            { type: 'email', message: 'Email is invalid' },
                        ]}
                    >
                        <Input placeholder={t('Your_Email')} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={t('Phone')}
                        rules={[
                            { required: true, message: 'Phone number cannot be empty' },
                            { pattern: REGNUMBER, message: 'Invalid phone number' },
                        ]}
                    >
                        <Input placeholder={t('Your_Phone_Number')} />
                    </Form.Item>
                    <Form.Item
                        name="message"
                        label={t('Write_Message_Here')}
                        rules={[
                            { required: true, message: 'Message cannot be empty' },
                            { max: 500, message: 'Limit input message is 500 characters' },
                        ]}
                    >
                        <TextArea placeholder={t('Enter_Message')} />
                    </Form.Item>
                    <Form.Item className="btn-group-contact ">
                        <Space>
                            <Button type="primary" htmlType="submit" className='btnSubmit'>
                                {t('Confirm')}
                            </Button>
                            <Button onClick={onClear} className='btnClear'>
                                {t('Clear')}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <Modal
                open={open}
                onOk={handleClose}
                onCancel={handleClose}
            >
                <h3 className="modal-name">{t('Your_Name_Is')}: {form.getFieldValue('inputName')}</h3>
                <p>{t('Position')}: {form.getFieldValue('jobselect')}</p>
                <p>{t('Email')}: {form.getFieldValue('email')}</p>
                <p>{t('Phone')}: {form.getFieldValue('phone')}</p>
                <p>{t('Message')}: {form.getFieldValue('message')}</p>
            </Modal>
        </>
    );
}
