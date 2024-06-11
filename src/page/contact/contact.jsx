import React, { useState } from "react";
import './contact.css';
import { message } from "antd";
import Modal from "../../modal/modal";
import { JOBSELECT, VALIDEMAIL, REGNUMBER } from "../../constants";
import { joinPaths } from "@remix-run/router";

export default function contact() {

    
    const [isValid, setIsValid] = useState(false);
    const [open, setOpen] = useState(false)
    // form data
    const [formData, setFormData] = useState({
        inputName: '',
        email: '',
        jobselect: '',
        phone: '',
        message: ''
    });

    //error state
    const [errorMessage, setErrorMessage] = useState({
        inputName: '',
        email: '',
        phone: '',
        message: ''
    });



    //handle modal
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        if (handlevalidation()) {
            handleOpen()
        }
    }


    const handlevalidation = () => {
        if (!formData.inputName) {
            setIsValid(false)
            setErrorMessage((prevErrors) => {
                return {
                    ...prevErrors,
                    inputName: 'Name cannot be empty',
                }
            });

        } else if (formData.inputName.length > 32) {
            setIsValid(false)
            setErrorMessage((prevErrors) => {
                return {
                    ...prevErrors,
                    inputName: 'Limit input name is 32',
                }
            });

        }
        if (!formData.email) {

            setIsValid(false)
            setErrorMessage((prevErrors) => {
                return {
                    ...prevErrors,
                    email: 'Email cannot be empty',
                }
            });

        } else if (!VALIDEMAIL.test(formData.email)) {
            setIsValid(false)
            setErrorMessage((prevErrors) => {
                return {
                    ...prevErrors,
                    email: 'Email is invalid',
                }
            });
        }

        if (!formData.phone) {
            setIsValid(false)
            setErrorMessage((prevErrors) => {
                return {
                    ...prevErrors,
                    phone: 'Phone number cannot be empty',
                }
            });

        } else if (!REGNUMBER.test(formData.phone)) {
            setIsValid(false)
            setErrorMessage((prevErrors) => {
                return {
                    ...prevErrors,
                    phone: 'Invalid phone number',
                }
            });
        }
        if (!formData.message) {
            setIsValid(false)
            setErrorMessage((prevErrors) => {
                return {
                    ...prevErrors,
                    message: 'Message cannot be empty',
                }
            });
        } else if (formData.message.length > 500) {
            setIsValid(false)
            setErrorMessage((prevErrors) => {
                return {
                    ...prevErrors,
                    message: 'Limit input message is 500',
                }
            });

        }
        if (formData.inputName !== '' && formData.phone !== '' && formData.message !== '' && formData.email !== ''
            && VALIDEMAIL.test(formData.email) && REGNUMBER.test(formData.phone) && formData.inputName.length <= 32 && formData.message.length <= 500) {
            return true
        }
        console.log(isValid);
        return isValid;
    };


    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value
        })
        setErrorMessage({
            ...errorMessage,
            [id]: ''
        })


    };

    //handle clear button
    const onClear = () => {
        setFormData({
            inputName: '',
            email: '',
            jobselect: '',
            phone: '',
            message: ''
        })

    };



    return <>
        <div className="contact-page">
            <div action="" className="formContact">
                <h3 className='decs'>Contact Us</h3>
                <p className='decs'>You are welcome to fill in the form below
                </p>
                <div className='form-group'>
                    <label htmlFor="jobselect">Your's current position</label>
                    <select id="jobselect"
                        className="forminput"
                        defaultValue=""
                        onChange={handleChange}>
                        <option value=""> Choose Your Position</option>
                        {JOBSELECT.map(jobs => (
                            <option value={jobs.jobName} key={jobs.id}>{jobs.jobName}</option>
                        ))}

                    </select>

                    <label htmlFor="name"> Your name</label>
                    <input
                        id="inputName"
                        className={`forminput ${errorMessage.inputName ? 'is-error' : ''}`}
                        placeholder='Enter Your Name Here'
                        type="text"
                        value={formData.inputName}
                        onChange={handleChange}

                    />
                    <span className='form-message'>{errorMessage.inputName}</span>
                    <label htmlFor="email"> Email</label>

                    <input
                        id="email"
                        className={`forminput ${errorMessage.email ? 'is-error' : ''}`}
                        type="email"
                        placeholder='Your Email'
                        value={formData.email}
                        onChange={handleChange}

                    />
                    <span className='form-message'>{errorMessage.email}</span>
                    <label htmlFor="phone"> Phone</label>
                    <input
                        id="phone"
                        className={`forminput ${errorMessage.phone ? 'is-error' : ''}`}
                        type="tel"
                        placeholder='Your Phone Number'
                        value={formData.phone}
                        onChange={handleChange}

                    />
                    <span className='form-message'>{errorMessage.phone}</span>
                    <label htmlFor="message">Write Message Here</label>
                    <textarea placeholder='Enter Messsage'
                        type="textarea"
                        className={`forminput-massage ${errorMessage.message ? 'is-error' : ''}`}
                        id="message"
                        value={formData.message}
                        onChange={handleChange}>
                    </textarea>
                    <span className='form-message'>{errorMessage.message}</span>
                    <div className='btn-group'>
                        <button className='btnSubmit' onClick={handleSubmit}>Confirm</button>
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