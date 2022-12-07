import React from "react";

export default function StatusIndicator({status}) {
    const statusClass = `status-${status}`;
    return (
        <span className={statusClass}>{status}</span>
    )
}