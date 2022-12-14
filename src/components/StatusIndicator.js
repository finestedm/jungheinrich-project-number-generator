import React from "react";
import { RxCross2, RxClock, RxCrumpledPaper, RxCheckCircled, RxArchive, RxLapTimer } from 'react-icons/rx';
import { IoTrashBinOutline, IoShareOutline, IoFlashOutline, IoCloseCircleOutline } from 'react-icons/io5';


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
        <span className={statusClass}>
            <div  className="d-inline">
                {statusIcon(status)}
            </div>
            <div className="d-none d-lg-inline ms-2">
                {statusDescription(status)}
            </div>
        </span>
    )
}