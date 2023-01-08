import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { users } from '../data/users';

function activeUserCounter(filters) {
    const allUsers = users.length
    const activeUsers = filters.users.length
    return (activeUsers < allUsers ) ? ` (${activeUsers} / ${allUsers})` : ''
}

export default function UserToggler({ filters, changeUserInFilters }) {
    
    return(
        <Dropdown autoClose="outside">
        <Dropdown.Toggle className='p-0 m-0' id="dropdown-basic">
            Handlowiec {activeUserCounter(filters)}
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeUserInFilters('all')} className='border-bottom d-flex align-items-center user-name-toggle'>
                <Form.Check
                    id='status-all' 
                    value='all'  
                    onChange={(e) => changeUserInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2 py-2 '
                    inline
                    checked={(filters.users).length === users.length}
                    label={<span>{(filters.users).length === users.length ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                    name="status"
                    />
            </Dropdown.Item>
            {users.map(user => {
                ((Object.values(filters.users)).filter(key => key.value === user.value))
                return(    
                <Dropdown.Item onClick={() => changeUserInFilters(user.value)} className='d-flex align-items-center user-name-toggle py-1'>
                    <Form.Check
                        id={user.value}
                        value={user.value}
                        checked={(((filters.users).filter(key => key.value === user.value)).length > 0)}
                        onChange={() => changeUserInFilters(user.value)}
                        className='d-flex align-items-center gap-2'
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