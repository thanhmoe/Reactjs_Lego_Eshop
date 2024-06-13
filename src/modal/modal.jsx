import React from "react";
import './modal.css'

export default function modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null
    }

    return <>
        <div onClick={onClose} className="modal"></div>
        <div >

            <div className="content">
                <span onClick={onClose} className="close">&times;</span>
                {children}
            </div>
        </div>
    </>
}