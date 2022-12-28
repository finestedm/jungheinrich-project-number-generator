import React from 'react';
import {Dropdown, Form} from 'react-bootstrap';
import StatusIndicator from './StatusIndicator';

function activeStatusCounter(filters) {
    const allStatuses = Object.values(filters.status).length
    const activeStatuses = (Object.values(filters.status).filter(status => status === true)).length
    return (activeStatuses < allStatuses ) ? ` (${activeStatuses}/${allStatuses})` : ''
}

export default function StatusToggler({ filters, changeStatusInFilters }) {


    return(
    <Dropdown autoClose="outside">
        <Dropdown.Toggle className='p-0 m-0' id="dropdown-basic">
            <span className='d-none d-lg-inline'>Status</span> <span className='d-inline d-lg-none'>St.</span> {activeStatusCounter(filters)}
        </Dropdown.Toggle>
        
            
        <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeStatusInFilters('all')} className='border-bottom py-2 d-flex align-items-center status-toggle'>
                <Form.Check
                    id='status-all' 
                    value='all'  
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2'
                    inline
                    checked={Object.values(filters.status).every(status => status === true)}
                    label={<span>{Object.values(filters.status).every(status => status === true) ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                    name="status"
                    />
            </Dropdown.Item>
                
            <Dropdown.Item onClick={() => changeStatusInFilters(0)} className='d-flex align-items-center status-toggle'>
                <Form.Check
                    id='status-0'
                    value='0'    
                    checked={filters.status[0]}    
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2 py-1'
                    inline
                    label={<StatusIndicator status={0} />}
                    name="status"
                />
            </Dropdown.Item>
                
            <Dropdown.Item onClick={() => changeStatusInFilters(1)} className='d-flex align-items-center status-toggle'>
                <Form.Check
                    id='status-1'
                    value='1'    
                    checked={filters.status[1]}    
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2 py-1'
                    inline
                    label={<StatusIndicator status={1} />}
                    name="status"
                />
            </Dropdown.Item>

            <Dropdown.Item onClick={() => changeStatusInFilters(2)} className='d-flex align-items-center status-toggle'>
                <Form.Check
                    id='status-2'
                    value='2'    
                    checked={filters.status[2]}    
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2 py-1'
                    inline
                    label={<StatusIndicator status={2} />}
                    name="status"
                />
            </Dropdown.Item>
                
        </Dropdown.Menu>
    </Dropdown>
    )
}