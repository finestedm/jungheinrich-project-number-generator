import React from "react";
import { RxCross2, RxClock, RxCrumpledPaper, RxCheckCircled, RxArchive, RxLapTimer } from 'react-icons/rx';

export default function StatusIndicator({status}) {
    const statusClass = `status-${status}`;
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
        <span className={statusClass}>
            <div className="d-none d-lg-inline">
                {statusDescription(status)}
            </div>
            <div className="d-inline d-lg-none">
                {statusIcon(status)}
            </div>
        </span>
    )
}