import React from 'react';
import {Dropdown, Form, Button} from 'react-bootstrap';
import StatusIndicator from './StatusIndicator';


export default function StatusToggler({ filters, changeStatusInFilters }) {
    
    return(
    <Dropdown autoClose="outside">
        <Dropdown.Toggle className='p-0 m-0' id="dropdown-basic">
            STATUS
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
            <Dropdown.Item className='border-bottom pb-1'>
                <Form.Check
                    className='d-flex align-items-center gap-2'
                    inline
                    checked={filters.status.length === 3}
                    label={<span>Zaznacz wszystkie</span>}
                    name="group1"
                />
            </Dropdown.Item>

            <Dropdown.Item onClick={() => changeStatusInFilters(0)}>
                <Form.Check
                    className='d-flex align-items-center gap-2'
                    inline
                    checked={filters.status.includes(0)}
                    label={<StatusIndicator status={0} />}
                    name="group1"
                />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeStatusInFilters(1)}>
                <Form.Check
                    className='d-flex align-items-center gap-2'
                    inline
                    checked={filters.status.includes(1)}
                    label={<StatusIndicator status={1} />}
                    name="group1"
                />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeStatusInFilters(2)}>
                <Form.Check
                    className='d-flex align-items-center gap-2'
                    inline
                    checked={filters.status.includes(2)}
                    label={<StatusIndicator status={2} />}
                    name="group1"
                />
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    )
}