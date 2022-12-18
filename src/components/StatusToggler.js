import React from 'react';
import {Dropdown, Form} from 'react-bootstrap';
import StatusIndicator from './StatusIndicator';


export default function StatusToggler(){
    return(
    <Dropdown>
      <Dropdown.Toggle className='p-0 m-0' id="dropdown-basic">
        STATUS
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
            <Form.Check
                inline
                label={<StatusIndicator status={0} />}
                name="group1"
            />
        </Dropdown.Item>
        <Dropdown.Item href="#/action-1">
            <Form.Check
                inline
                label={<StatusIndicator status={1} />}
                name="group1"
            />
        </Dropdown.Item>
        <Dropdown.Item href="#/action-1">
            <Form.Check
                inline
                label={<StatusIndicator status={2} />}
                name="group1"
            />
        </Dropdown.Item>      </Dropdown.Menu>
    </Dropdown>
    )
}