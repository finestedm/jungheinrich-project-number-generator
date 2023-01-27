import React, { useState } from 'react';
import { Dropdown, Form, Image, Button, ButtonGroup } from 'react-bootstrap';
import { salesPersons } from '../data/salesPersons';
import {MdOutlineCardTravel, MdOutlineArrowDropDown} from 'react-icons/md'

export function activeUserCounter(filters) {
    const numberOfSalesPersons = salesPersons.length
    const activeSalesPersons = filters.salesPersons.length
    return (activeSalesPersons < numberOfSalesPersons ) ? ` (${activeSalesPersons} / ${numberOfSalesPersons})` : ''
}

export default function UserToggler({ filters, changeSalesPersonInFilters }) {
    return (
        <ButtonGroup vertical className='btn-ps-blank btn-collapsable w-100'>
            <Button className='btn-ps-collapsing' data-bs-toggle="collapse" data-bs-target="#collapsable-salesperson">
                <span className='d-flex align-items-center gap-1'>
                    <MdOutlineCardTravel size='1.25em'/>
                    <span>Handlowiec</span> 
                    <span className='ms-auto'>{activeUserCounter(filters)}</span> 
                    <MdOutlineArrowDropDown size='1.25em'/>
                </span>
            </Button>
            

            <div className='expandable-dropdown collapse w-100' id='collapsable-salesperson'>
                
                <Dropdown.Divider className='mt-0 p-0' />
                
                <div className='expendable-item d-flex align-items-center px-3 py-1 user-name-toggle'>
                    <Form.Check
                        onChange={(e) => changeSalesPersonInFilters(e.target.value)}
                        id='salesperson-all' 
                        value='all'  
                        className='d-flex align-items-center gap-3'
                        inline
                        checked={(filters.salesPersons).length === salesPersons.length}
                        label={<span className='fw-bolder'>{(filters.salesPersons).length === salesPersons.length ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</span>}
                        name="salesperson"
                        />
                </div>
                    
                <Dropdown.Divider className='mt-0 p-0' style={{borderTop: '1px solid var(--ps-border-color-50)'}}/>
                    
                {salesPersons.map(user => {
                    ((Object.values(filters.salesPersons)).filter(key => key.value === user.value))
                    return(
                    <div className='expendable-item d-flex align-items-center px-3 user-name-toggle py-1'>
                        <Form.Check
                            onChange={(e) => changeSalesPersonInFilters(e.target.value)}
                            id={user.value}
                            value={user.value}
                            checked={(((filters.salesPersons).filter(key => key.value === user.value)).length > 0)}
                            className='d-flex align-items-center gap-3'
                            inline
                            label={<div className='d-flex gap-2 align-items-center'> <Image style={{height: '1.75rem'}} roundedCircle src={user.photo} /> <span>{user.value}</span> </div>}
                            name="salesperson"
                        />
                    </div>)
                })}
                    
            </div>
        </ButtonGroup>
    )
}