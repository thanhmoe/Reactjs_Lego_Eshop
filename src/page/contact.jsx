import React from "react";
import './contact.css';

export default function contact() {
    return <>
        <div className="contact-page">
            <div className="formContact">
                <h3 className='decs'>Contact Us</h3>
                <p className='decs'>You are welcome to fill in the form below
                    <p>feel free to contact us for business or question!</p></p>
                <div className='form-group'>
                    <label htmlFor="name"> Your name</label>
                    <input
                        className='forminput'
                        placeholder='Your Name'
                        type="text"
                        id="name"
                        required
                    /><label htmlFor="email"> Email</label>
                    <input
                        className='forminput'
                        type="email"
                        placeholder='Your Email'

                    />
                    <label htmlFor="phone"> Phone</label>
                    <input
                        id="phone"
                        className='forminput'
                        type="tel"
                        placeholder='Your Phone Number'

                    />
                    <label htmlFor="message"> Message</label>
                    <input
                        id="message"
                        className='forminput-massage'
                        type="text"
                        placeholder='Enter Messsage'

                    />
                </div>

                <div className='btn-group'>
                    <button className='btnSubmit'>Confirm</button>
                </div>

            </div>
        </div>
    </>
}