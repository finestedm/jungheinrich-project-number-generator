import React from 'react';
import {Dropdown, Form, ButtonGroup, Button} from 'react-bootstrap';
import StatusIndicator from './StatusIndicator';
import {MdOutlineLocalOffer, MdOutlineArrowDropDown} from "react-icons/md"


export function activeStatusCounter(filters) {
    const allStatuses = Object.values(filters.status).length
    const activeStatuses = (Object.values(filters.status).filter(status => status === true)).length
    return (activeStatuses < allStatuses ) ? ` (${activeStatuses}/${allStatuses})` : ''
}

export default function StatusToggler({ filters, changeStatusInFilters }) {


    return(
        <ButtonGroup vertical className='btn-ps-blank btn-collapsable w-100'>
            <Button className='btn-ps-collapsing' data-bs-toggle="collapse" data-bs-target="#collapsable-status">
                <span className='d-flex align-items-center gap-1'>
                    <MdOutlineLocalOffer size='1.25em'/>
                    <span>Status</span> 
                    <span className='ms-auto'>{activeStatusCounter(filters)}</span> 
                    <MdOutlineArrowDropDown size='1.25em'/>
                </span>
            </Button>
        
            <div className='expandable-dropdown collapse w-100' id='collapsable-status'>

            <div className='expendable-item d-flex align-items-center px-3 py-1 user-name-toggle'>
                <Form.Check
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    id='status-all' 
                    value='all'  
                    className='d-flex align-items-center gap-3'
                    inline
                    checked={Object.values(filters.status).every(status => status === true)}
                    label={<span>{Object.values(filters.status).every(status => status === true) ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                    name="status"
                />
            </div>

            <Dropdown.Divider className='mt-0 p-0' style={{borderTop: '1px solid var(--ps-border-color-50)'}}/>
           
            <div className='expendable-item d-flex align-items-center px-3 user-name-toggle py-1'>
                <Form.Check
                    onClick={() => changeStatusInFilters(0)}
                    id='status-0'
                    value='0'    
                    checked={filters.status[0]}    
                    className='d-flex align-items-center gap-2 py-1'
                    inline
                    label={<StatusIndicator status={0} />}
                    name="status"
                />
            </div>

            <div className='expendable-item d-flex align-items-center px-3 user-name-toggle py-1'>
                <Form.Check
                    onClick={() => changeStatusInFilters(1)}
                    id='status-1'
                    value='1'    
                    checked={filters.status[1]}    
                    className='d-flex align-items-center gap-2 py-1'
                    inline
                    label={<StatusIndicator status={1} />}
                    name="status"
                />
            </div>

            <div className='expendable-item d-flex align-items-center px-3 user-name-toggle py-1'>
                <Form.Check
                    onClick={() => changeStatusInFilters(2)}
                    id='status-2'
                    value='2'    
                    checked={filters.status[2]}    
                    className='d-flex align-items-center gap-2 py-1'
                    inline
                    label={<StatusIndicator status={2} />}
                    name="status"
                />
            </div>
        </div>
    </ButtonGroup>
    )
}