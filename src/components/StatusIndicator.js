import React from "react";

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
    return (
        <span className={statusClass}><div className="d-none d-lg-inline">{statusDescription(status)}</div></span>
    )
}