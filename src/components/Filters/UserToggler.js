import React, { useState } from 'react';
import { Dropdown, Form, Image, Button, ButtonGroup } from 'react-bootstrap';
import { salesPersons } from '../../data/salesPersons';
import {MdOutlineCardTravel, MdOutlineArrowDropDown, MdOutlineCheck} from 'react-icons/md'

export function activeUserCounter(filters) {
    const numberOfSalesPersons = salesPersons.length
    const activeSalesPersons = filters.salesPersons.length
    return (activeSalesPersons < numberOfSalesPersons ) ? ` (${activeSalesPersons} / ${numberOfSalesPersons})` : ''
}

export default function UserToggler({ filters, changeSalesPersonInFilters }) {
    return (
        <ButtonGroup vertical className='btn-ps-blank btn-collapsable w-100'>
            <Button className='btn-ps-collapsing py-2' data-bs-toggle="collapse" data-bs-target="#collapsable-salesperson">
                <span className='d-flex align-items-center gap-2'>
                    <MdOutlineCardTravel size='1.5em' className='p-1'/>
                    <span>Handlowiec</span> 
                    <span className='ms-auto'>{activeUserCounter(filters)}</span> 
                    <MdOutlineArrowDropDown size='1.25em'/>
                </span>
            </Button>
            

            <div className='expandable-dropdown collapse w-100' id='collapsable-salesperson'>
                
                <Dropdown.Divider className='my-0 p-0' />
                
                <div onClick={() => changeSalesPersonInFilters('all')} className='expendable-item d-flex align-items-center px-3 py-2 user-name-toggle'>
                    <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                        {<span>{(filters.salesPersons).length === salesPersons.length ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                        {(filters.salesPersons).length === salesPersons.length ? <MdOutlineCheck size='1.25em' className='filter-check-icon ms-auto' /> : ''}
                    </div>
                </div>
                    
                <Dropdown.Divider className='mt-0 p-0' style={{borderTop: '1px solid var(--ps-border-color-50)'}}/>
                    
                {salesPersons.map(user => {
                    ((Object.values(filters.salesPersons)).filter(key => key.value === user.value))
                    return(
                        <div onClick={() => changeSalesPersonInFilters(user.value)} className='expendable-item d-flex align-items-center px-3 py-2 user-name-toggle'>
                            <div className='d-flex gap-2 w-100 align-items-center justify-content-stretch'>
                                <Image style={{ height: '1.5rem' }} roundedCircle src={user.photo} />
                                <span>{user.value}</span>
                                {(((filters.salesPersons).filter(key => key.value === user.value)).length > 0) ? <MdOutlineCheck size='1.25em' className='filter-check-icon ms-auto' /> : ''}
                            </div>
                        </div>
                    )
                })}
                    
            </div>
        </ButtonGroup>
    )
}