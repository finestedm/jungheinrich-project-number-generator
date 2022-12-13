import React from "react";
import { RxCross2, RxClock, RxCrumpledPaper, RxCheckCircled, RxArchive, RxLapTimer } from 'react-icons/rx';

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
                return <RxLapTimer />;
            case 1:
                return <RxCheckCircled />;
            case 2:
                return <RxCrumpledPaper />;
            case 3:
                return <RxArchive />;
            default:
                break;
        }
    }

    return (
        <div id={statusId}>
            <span className='d-flex justify-content-center gap-2'>
                <div  className="d-inline">
                    {statusIcon(status)}
                </div>
                <div className="d-none d-lg-inline">
                    {statusDescription(status)}
                </div>
            </span>
        </div>
    )
}