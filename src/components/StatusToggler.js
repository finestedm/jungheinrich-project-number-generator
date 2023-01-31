import React from 'react';
import {Dropdown, Form, ButtonGroup, Button} from 'react-bootstrap';
import StatusIndicator from './StatusIndicator';
import {MdOutlineLocalOffer, MdOutlineArrowDropDown, MdOutlineCheck} from "react-icons/md"


export function activeStatusCounter(filters) {
    const allStatuses = Object.values(filters.status).length
    const activeStatuses = (Object.values(filters.status).filter(status => status === true)).length
    return (activeStatuses < allStatuses ) ? ` (${activeStatuses}/${allStatuses})` : ''
}

export default function StatusToggler({ filters, changeStatusInFilters }) {

    return(
        <ButtonGroup vertical className='btn-ps-blank btn-collapsable w-100'>
            <Button className='btn-ps-collapsing py-2' data-bs-toggle="collapse" data-bs-target="#collapsable-status">
                <span className='d-flex align-items-center gap-1'>
                    <MdOutlineLocalOffer size='1.5em'/>
                    <span>Status</span> 
                    <span className='ms-auto'>{activeStatusCounter(filters)}</span> 
                    <MdOutlineArrowDropDown size='1.25em'/>
                </span>
            </Button>
      
            <div className='expandable-dropdown collapse w-100' id='collapsable-status'>

                <div onClick={() => changeStatusInFilters('all')} className='expendable-item d-flex align-items-center px-3 py-2 status-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        {<span>{Object.values(filters.status).every(status => status === true) ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                        {(Object.values(filters.status).every(status => status === true)) ? <MdOutlineCheck size='1.25em' className='filter-check-icon ms-auto' /> : ''}
                    </div>
                </div>
                
                <Dropdown.Divider className='mt-0 p-0' style={{borderTop: '1px solid var(--ps-border-color-50)'}}/>
            
                <div onClick={() => changeStatusInFilters(0)} className='expendable-item d-flex align-items-center px-3 py-2 status-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        <span><StatusIndicator status={0} /></span>
                        {(filters.status[0]) ? <MdOutlineCheck size='1.25em' className='filter-check-icon ms-auto' /> : ''}
                    </div>
                </div>

                <div onClick={() => changeStatusInFilters(1)} className='expendable-item d-flex align-items-center px-3 py-2 status-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        <span><StatusIndicator status={1} /></span>
                        {(filters.status[1]) ? <MdOutlineCheck size='1.25em' className='filter-check-icon ms-auto' /> : ''}
                    </div>
                </div>

                <div onClick={() => changeStatusInFilters(2)} className='expendable-item d-flex align-items-center px-3 py-2 status-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        <span><StatusIndicator status={2} /></span>
                        {(filters.status[2]) ? <MdOutlineCheck size='1.25em' className='filter-check-icon ms-auto' /> : ''}
                    </div>
                </div>
            </div>
        </ButtonGroup>
    )
}