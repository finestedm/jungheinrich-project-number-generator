import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { salesPersons } from '../data/salesPersons';
import {MdOutlineCardTravel} from 'react-icons/md'

function activeUserCounter(filters) {
    const numberOfSalesPersons = salesPersons.length
    const activeSalesPersons = filters.salesPersons.length
    return (activeSalesPersons < numberOfSalesPersons ) ? ` (${activeSalesPersons} / ${numberOfSalesPersons})` : ''
}

export default function UserToggler({ filters, changeSalesPersonInFilters }) {
    return(
        <Dropdown autoClose="outside">
        <Dropdown.Toggle className='p-0 m-0' id="dropdown-basic">
            <MdOutlineCardTravel /> Handlowiec {activeUserCounter(filters)}
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeSalesPersonInFilters('all')} className='d-flex align-items-center user-name-toggle'>
                <Form.Check
                    id='status-all' 
                    value='all'  
                    onChange={(e) => changeSalesPersonInFilters(e.target.value)}
                    className='d-flex align-items-center gap-2 py-2 '
                    inline
                    checked={(filters.salesPersons).length === salesPersons.length}
                    label={<span>{(filters.salesPersons).length === salesPersons.length ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                    name="status"
                    />
            </Dropdown.Item>
            {salesPersons.map(user => {
                ((Object.values(filters.salesPersons)).filter(key => key.value === user.value))
                return(    
                <Dropdown.Item onClick={() => changeSalesPersonInFilters(user.value)} className='d-flex align-items-center user-name-toggle py-1'>
                    <Form.Check
                        id={user.value}
                        value={user.value}
                        checked={(((filters.salesPersons).filter(key => key.value === user.value)).length > 0)}
                        onChange={() => changeSalesPersonInFilters(user.value)}
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