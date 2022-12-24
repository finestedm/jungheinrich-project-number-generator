import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { users } from '../data/users';
import StatusIndicator from './StatusIndicator';

// function activeStatusCounter(filters) {
//     const allStatuses = Object.values(filters.status).length
//     const activeStatuses = (Object.values(filters.status).filter(status => status === true)).length
//     return (activeStatuses < allStatuses )? ` (${activeStatuses} / ${allStatuses})` : ''
// }

export default function UserToggler({ filters, changeUserInFilters }) {


    return(
    <Dropdown autoClose="outside">
        <Dropdown.Toggle className='p-0 m-0' id="dropdown-basic">
            Handlowiec 
        </Dropdown.Toggle>
        
            
        <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeUserInFilters('all')} className='border-bottom pb-1 d-flex align-items-center'>
                <Form.Check
                    id='status-all' 
                    value='all'  
                    onChange={(e) => changeUserInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2'
                    inline
                    checked={Object.values(filters.status).every(status => status === true)}
                    label={<span>{Object.values(filters.status).every(status => status === true) ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                    name="status"
                    />
            </Dropdown.Item>
            {users.forEach(user => console.log(user.value))}
            {users.map(user => {
                return(    
                <Dropdown.Item onClick={() => changeUserInFilters(user)}>
                    <Form.Check
                        id={user.value}
                        value={user.value}
                        checked={Object.keys(filters.users).includes(user.value)}
                        onChange={() => changeUserInFilters(user.value)}
                        className='d-flex align-items-center gap-2 mt-2'
                        inline
                        label={user.value}
                        name="user"
                    />
                </Dropdown.Item>)
            })}
                
        </Dropdown.Menu>
    </Dropdown>
    )
}