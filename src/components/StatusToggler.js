import React from 'react';
import {Dropdown, Form} from 'react-bootstrap';
import StatusIndicator from './StatusIndicator';


export default function StatusToggler({ filters, changeStatusInFilters }) {
    console.log(filters.status)
    return(
    <Dropdown autoClose="outside">
        <Dropdown.Toggle className='p-0 m-0' id="dropdown-basic">
            STATUS
        </Dropdown.Toggle>
        
            
        <Dropdown.Menu>
            <Dropdown.Item className='border-bottom pb-1'>
                <Form.Check
                    onChange={() => changeStatusInFilters(1)}
                    className='d-flex align-items-center gap-2'
                    inline
                    checked
                    label={<span>Zaznacz wszystkie</span>}
                    name="status"
                    />
            </Dropdown.Item>
                
            <Dropdown.Item>
                <Form.Check
                    onChange={() => changeStatusInFilters(0)}
                    className='d-flex align-items-center gap-2'
                    inline
                    label={<StatusIndicator status={0} />}
                    name="status"
                />
            </Dropdown.Item>
                
            <Dropdown.Item>
                <Form.Check
                    onChange={() => changeStatusInFilters(1)}
                    className='d-flex align-items-center gap-2'
                    inline
                    label={<StatusIndicator status={1} />}
                    name="status"
                />
            </Dropdown.Item>

            <Dropdown.Item>
                <Form.Check
                    onChange={() => changeStatusInFilters(2)}
                    className='d-flex align-items-center gap-2'
                    inline
                    label={<StatusIndicator status={2} />}
                    name="status"
                />
            </Dropdown.Item>
                
        </Dropdown.Menu>
    </Dropdown>
    )
}