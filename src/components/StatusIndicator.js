import React from "react";
import { RxArchive } from 'react-icons/rx';
import {  IoDocumentTextOutline, IoFlashOutline, IoCloseCircleOutline } from 'react-icons/io5';

const statusDescription = (status) => {
    switch (parseInt(status)) {
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
        const size='1.2em'
        switch (status) {
            case 0:
                return <IoDocumentTextOutline size={size}/>;
            case 1:
                return <IoFlashOutline size={size}/>;
            case 2:
                return <IoCloseCircleOutline size={size}/>;
            case 3:
                return <RxArchive size={size}/>;
            default:
                break;
        }
    }

    return (
        <div>
            <span style={{lineHeight: '1.4rem'}} className='d-inline-flex align-items-center justify-content-center gap-2 p-2 rounded' id={statusId}>
                <div className="d-inline status-indicator--icon" >
                    {statusIcon(status)}
                </div>
                <div className="d-none d-lg-inline ms-2 status-description" style={{fontSize: '12px'}}>
                    {statusDescription(status)}
                </div>
            </span>
        </div>
    )
}

export {statusDescription}