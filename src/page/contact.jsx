import React, { useState } from "react";
import './contact.css';
import { message } from "antd";
import Modal from "../modal/modal";

export default function contact() {

    const [open, setOpen] = useState(false)
    const [interacted, setInteracted] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    const [formData, setFormData] = useState({
        inputName: '',
        email: '',
        jobselect: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setInteracted(true)
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value
        })
    }

    const onClear = () => {
        setFormData({
            inputName: '',
            email: '',
            jobselect: '',
            phone: '',
            message: ''
        })

    }
    const submit = () => {
        handleOpen()
        console.log(formData)
    }

    const isActive = formData.inputName === '' || formData.email === '' || formData.message === '';
    return <>
        <div className="contact-page">
            <div className="formContact">
                <h3 className='decs'>Contact Us</h3>
                <p className='decs'>You are welcome to fill in the form below
                </p>
                <div className='form-group'>
                    <label htmlFor="jobselect">Your's current position</label>
                    <select id="jobselect"
                        className="forminput"
                        defaultValue=""
                        onChange={handleChange}>
                        <option value='' >Choose your position</option>
                        <option value='Employee' >Employee</option>
                        <option value='Student' >Student</option>
                        <option value='Other'>Other</option>
                    </select>
                    <label htmlFor="name"> Your name</label>
                    <input
                        id="inputName"
                        className='forminput'
                        placeholder='Enter Your Name Here'
                        type="text"
                        required
                        value={formData.inputName}
                        onChange={handleChange}

                    />
                    {(isActive) ? <span className='form-message'>this is require*</span> : null}
                    <label htmlFor="email"> Email</label>

                    <input
                        id="email"
                        className='forminput'
                        type="email"
                        placeholder='Your Email'
                        value={formData.email}
                        onChange={handleChange}

                    />
                    {(isActive) ? <span className='form-message'>this is require*</span> : null}
                    <label htmlFor="phone"> Phone</label>
                    <input
                        id="phone"
                        className='forminput'
                        type="tel"
                        placeholder='Your Phone Number'
                        value={formData.phone}
                        onChange={handleChange}

                    />
                    {(isActive) ? <span className='form-message'>this is require*</span> : null}
                    <label htmlFor="message">Write Message Here</label>
                    <textarea placeholder='Enter Messsage'
                        type="textarea"
                        className="forminput-massage"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}>
                    </textarea>
                    {(isActive) ? <span className='form-message'>this is require*</span> : null}
                    <div className='btn-group'>
                        <button className='btnSubmit' onClick={submit} disabled={isActive}>Confirm</button>
                        <button className='btnClear' onClick={onClear}>Clear</button>
                    </div>
                </div>
            </div>
        </div>

        <Modal isOpen={open} onClose={handleClose}>
            <h3 className="modal-name">Your name is:{formData.inputName}</h3>
            <p>Position:{formData.jobselect}</p>
            <p>Email:{formData.email}</p>
            <p>Phone:{formData.phone}</p>
            <p>Message:{formData.message}</p>
        </Modal>


    </>
}