import React from "react";
import './loadingModal.css'
import { Spin } from "antd";

export default function loadingModal() {
    return <>
        <div className="modal-container" data-backdrop="static">
        </div>
        <div className="modal-dialog modal-sm">
            <div className="modal-content">
                <div className="modal-body text-center">
                    <div> <Spin size="large"></Spin></div>
                </div>
            </div>
        </div>
    </>
}