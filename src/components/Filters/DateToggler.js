import React, { useState } from 'react';
import { Dropdown, Form, ButtonGroup, Button } from 'react-bootstrap';
import StatusIndicator from '../StatusIndicator';
import { MdOutlineLocalOffer, MdOutlineArrowDropDown, MdOutlineCheck } from "react-icons/md"
import DatePicker, { CalendarContainer } from "react-datepicker";

export function activeStatusCounter(filters) {
    const allStatuses = Object.values(filters.status).length
    const activeStatuses = (Object.values(filters.status).filter(status => status === true)).length
    return (activeStatuses < allStatuses) ? ` (${activeStatuses}/${allStatuses})` : ''
}

export default function DateToggler({ filters, changeStatusInFilters }) {

    const [startDate, setStartDate] = useState(new Date());

    const MyContainer = ({ className, children }) => {
        return (
            <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
                <CalendarContainer className={className}>
                    <div style={{ background: "#f0f0f0" }}>
                        What is your favorite day?
                    </div>
                    <div style={{ position: "relative" }}>{children}</div>
                </CalendarContainer>
            </div>
        );
    };

    return (
        <ButtonGroup vertical className='btn-ps-blank btn-collapsable w-100'>
            <Button className='btn-ps-collapsing py-2' data-bs-toggle="collapse" data-bs-target="#collapsable-status">
                <span className='d-flex align-items-center gap-1'>
                    <MdOutlineLocalOffer size='1.5em' className='p-1' />
                    <span>Data</span>
                    <span className='ms-auto'>{activeStatusCounter(filters)}</span>
                    <MdOutlineArrowDropDown size='1.25em' />
                </span>
            </Button>

            <div className='expandable-dropdown collapse w-100' id='collapsable-status'>

                <div onClick={() => changeStatusInFilters('all')} className='expendable-item d-flex align-items-center px-3 py-2 status-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        {<span>{Object.values(filters.status).every(status => status === true) ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                        {(Object.values(filters.status).every(status => status === true)) ? <MdOutlineCheck size='1.25em' className='filter-check-icon ms-auto' /> : ''}
                    </div>
                </div>

                <Dropdown.Divider className='mt-0 p-0' style={{ borderTop: '1px solid var(--ps-border-color-50)' }} />

                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    onCalendarOpen={(e) => console.log('opened')}
                    onCalendarClose={(e) => console.log('closed')}
                />
            </div>
        </ButtonGroup>
    )
}