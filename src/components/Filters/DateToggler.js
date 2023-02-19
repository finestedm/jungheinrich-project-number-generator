import React, { useEffect, useState } from 'react';
import { Dropdown, Form, ButtonGroup, Button, Modal } from 'react-bootstrap';
import StatusIndicator from '../StatusIndicator';
import { MdOutlineLocalOffer, MdOutlineArrowDropDown, MdClose } from "react-icons/md"
import DatePicker, { CalendarContainer } from "react-datepicker";

export function activeStatusCounter(filters) {
    const allStatuses = Object.values(filters.status).length
    const activeStatuses = (Object.values(filters.status).filter(status => status === true)).length
    return (activeStatuses < allStatuses) ? ` (${activeStatuses}/${allStatuses})` : ''
}

const MyContainer = ({ className, children }) => {
    return (
        <div style={{ padding: "1rem", color: "#fff" }}>
            <CalendarContainer className={className}>
                <div style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
        </div>
    );
};

export default function DateToggler({ filters, changeDateRangeInFilters }) {

    const [startDate, setStartDate] = useState(filters.startDate);
    const [endDate, setEndDate] = useState(filters.endDate);

    useEffect(() => {
        console.log(startDate)
        changeDateRangeInFilters(startDate, endDate)
    }, [startDate, endDate])

    return (
        <ButtonGroup vertical className='btn-ps-blank btn-collapsable w-100'>
            <Button className='btn-ps-collapsing py-2' data-bs-toggle="collapse" data-bs-target="#collapsable-date">
                <span className='d-flex align-items-center gap-1'>
                    <MdOutlineLocalOffer size='1.5em' className='p-1' />
                    <span>Data</span>
                    <span className='ms-auto'>{activeStatusCounter(filters)}</span>
                    <MdOutlineArrowDropDown size='1.25em' />
                </span>
            </Button>

            <div className='expandable-dropdown collapse w-100' id='collapsable-date'>

                <div onClick={() => changeDateRangeInFilters(new Date(2022, 1, 1), new Date())} className='expendable-item d-flex align-items-center px-3 py-2 date-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        Resetuj zakres dat
                        <MdClose />
                    </div>
                </div>

                <Dropdown.Divider className='mt-0 p-0' style={{ borderTop: '1px solid var(--ps-border-color-50)' }} />

                <div className='expendable-item d-flex align-items-center px-3 py-2 status-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        <span>
                            <DatePicker
                                className='datepicker-start w-100 rbt-input-main form-control rbt-input'
                                selected={filters.startDate}
                                onChange={(date) => setStartDate(date)}
                                portalId="App"
                                withPortal
                                calendarContainer={MyContainer}
                                showMonthDropdown
                                showYearDropdown
                                calendarStartDay={1}
                                dateFormat="dd/MM/yyyy"
                                excludeDateIntervals={[{ start: new Date(), end: new Date(2050, 1, 1) }]}
                            />
                        </span>
                    </div>
                </div>

                <div className='expendable-item d-flex align-items-center px-3 py-2 status-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        <span>
                            <DatePicker
                                className='datepicker-end w-100 rbt-input-main form-control rbt-input'
                                selected={filters.endDate}
                                onChange={(date) => setEndDate(date)}
                                portalId="App"
                                withPortal
                                calendarContainer={MyContainer}
                                showMonthDropdown
                                showYearDropdown
                                calendarStartDay={1}
                                dateFormat="dd/MM/yyyy"
                                excludeDateIntervals={[{ start: new Date(1900, 1, 1), end: filters.startDate }]}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </ButtonGroup>
    )
}