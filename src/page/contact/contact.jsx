// File: /src/components/Contact.js

import React, { useState } from "react";
import { JOBSELECT, VALIDEMAIL, REGNUMBER } from "../../utils/constants";
import { Modal, Form, Input, Select, Button, notification, Space } from "antd";
import './contact.css';

const { TextArea } = Input;
const { Option } = Select;

export default function Contact() {
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
                <h3 className='decs-contact'>Contact Us</h3>
                <p className='decs-contact'>You are welcome to fill in the form below</p>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="jobselect"
                        label="Your's current position"
                    >
                        <Select placeholder="Choose Your Position">
                            {JOBSELECT.map(job => (
                                <Option value={job.jobName} key={job.id}>{job.jobName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="inputName"
                        label="Your name"
                        rules={[
                            { required: true, message: 'Name cannot be empty' },
                            { max: 32, message: 'Limit input name is 32 characters' },
                        ]}
                    >
                        <Input placeholder='Enter Your Name Here' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Email cannot be empty' },
                            { type: 'email', message: 'Email is invalid' },
                        ]}
                    >
                        <Input placeholder='Your Email' />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            { required: true, message: 'Phone number cannot be empty' },
                            { pattern: REGNUMBER, message: 'Invalid phone number' },
                        ]}
                    >
                        <Input placeholder='Your Phone Number' />
                    </Form.Item>
                    <Form.Item
                        name="message"
                        label="Write Message Here"
                        rules={[
                            { required: true, message: 'Message cannot be empty' },
                            { max: 500, message: 'Limit input message is 500 characters' },
                        ]}
                    >
                        <TextArea placeholder='Enter Message' />
                    </Form.Item>
                    <Form.Item className="btn-group-contact ">
                        <Space>
                            <Button type="primary" htmlType="submit" className='btnSubmit'>
                                Confirm
                            </Button>
                            <Button onClick={onClear} className='btnClear'>
                                Clear
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
                <h3 className="modal-name">Your name is: {form.getFieldValue('inputName')}</h3>
                <p>Position: {form.getFieldValue('jobselect')}</p>
                <p>Email: {form.getFieldValue('email')}</p>
                <p>Phone: {form.getFieldValue('phone')}</p>
                <p>Message: {form.getFieldValue('message')}</p>
            </Modal>
        </>
    );
}
