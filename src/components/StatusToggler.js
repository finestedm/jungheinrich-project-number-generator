import React from 'react';
import {Dropdown, Form} from 'react-bootstrap';
import StatusIndicator from './StatusIndicator';


export default function StatusToggler({ filters, changeStatusInFilters }) {
    return(
    <Dropdown autoClose="outside">
        <Dropdown.Toggle className='p-0 m-0' id="dropdown-basic">
            STATUS
        </Dropdown.Toggle>
        
            
        <Dropdown.Menu>
            <Dropdown.Item className='border-bottom pb-1 d-flex align-items-center'>
                <Form.Check
                    id='status-all' 
                    value='all'  
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2'
                    inline
                    checked={Object.values(filters.status).every(status => status === true)}
                    label={<span onClick={() => changeStatusInFilters('all')}>{Object.values(filters.status).every(status => status === true) ? 'Odznacz wszytskie' : 'Zaznacz wszytskie'}</span>}
                    name="status"
                    />
            </Dropdown.Item>
                
            <Dropdown.Item>
                <Form.Check
                    id='status-0'
                    value='0'    
                    checked={filters.status[0]}    
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2'
                    inline
                    label={<div onClick={() => changeStatusInFilters(0)}><StatusIndicator status={0} /></div>}
                    name="status"
                />
            </Dropdown.Item>
                
            <Dropdown.Item>
                <Form.Check
                    id='status-1'
                    value='1'    
                    checked={filters.status[1]}    
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2'
                    inline
                    label={<div onClick={() => changeStatusInFilters(1)}><StatusIndicator status={1} /></div>}
                    name="status"
                />
            </Dropdown.Item>

            <Dropdown.Item>
                <Form.Check
                    id='status-2'
                    value='2'    
                    checked={filters.status[2]}    
                    onChange={(e) => changeStatusInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2'
                    inline
                    label={<div onClick={() => changeStatusInFilters(2)}><StatusIndicator status={2} /></div>}
                    name="status"
                />
            </Dropdown.Item>
                
        </Dropdown.Menu>
    </Dropdown>
    )
}