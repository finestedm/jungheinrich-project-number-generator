import React from "react";
import { RxArchive } from 'react-icons/rx';
import {  IoDocumentTextOutline, IoFlashOutline, IoCloseCircleOutline } from 'react-icons/io5';

const statusDescription = (status) => {
    switch (status) {
        case 0:
            return 'ofertowany';
        case 1:
            return 'zamówiony';
        case 2:
            return 'przegrany';
        case 3:
            return 'zamknięty';
        default:
            break;
    }
}

export default function StatusIndicator({status}) {
    const statusId = `status-${status}`;
    
    const statusIcon = (status) => {
        switch (status) {
            case 0:
                return <IoDocumentTextOutline />;
            case 1:
                return <IoFlashOutline />;
            case 2:
                return <IoCloseCircleOutline />;
            case 3:
                return <RxArchive />;
            default:
                break;
        }
    }

    return (
        <div>
            <span className='justify-content-center gap-2 p-2 rounded' id={statusId}>
                <div className="d-inline status-indicator--icon">
                    {statusIcon(status)}
                </div>
                <div className="d-none d-lg-inline ms-2 status-description">
                    {statusDescription(status)}
                </div>
            </span>
        </div>
    )
}

export {statusDescription}