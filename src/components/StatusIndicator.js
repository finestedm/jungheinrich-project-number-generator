import React from "react";
import { RxArchive } from 'react-icons/rx';
import {  IoShareOutline, IoFlashOutline, IoCloseCircleOutline } from 'react-icons/io5';


export default function StatusIndicator({status}) {
    const statusId = `status-${status}`;
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

    const statusIcon = (status) => {
        switch (status) {
            case 0:
                return <IoShareOutline />;
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
        <div className='Z'>
            <span className='justify-content-center gap-2 py-1 px-2 rounded-pill' id={statusId}>
                <div  className="d-inline">
                    {statusIcon(status)}
                </div>
                <div className="d-none d-lg-inline ms-2">
                    {statusDescription(status)}
                </div>
            </span>
        </div>
    )
}