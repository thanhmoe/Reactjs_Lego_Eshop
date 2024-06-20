import React from "react";
import './modalImage.css'

export default function modalImage({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null
    }
    return <>
        <div onClick={onClose} className="modal-image"></div>
        <div >
            <div className="content-image">
                <span onClick={onClose} className="btn-close">x</span>
                {children}
            </div>
        </div>
    </>
}