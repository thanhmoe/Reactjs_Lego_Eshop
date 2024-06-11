import React from "react";
import './loadingModal.css'



export default function loadingModal() {
    // if (!isOpen) {
    //     return null
    // }


    return <>
        <div className="modal-container" id="modal-loading" data-backdrop="static">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <div className="loading-spinner mb-2"></div>
                        <div>Loading</div>
                    </div>
                </div>
            </div>
        </div>


    </>
}