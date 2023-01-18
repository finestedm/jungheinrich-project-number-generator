import React from 'react'
import {Button, ButtonGroup, Col} from 'react-bootstrap'
import { salesPersons } from '../data/salesPersons'
import { statusDescription } from './StatusIndicator'
import { IoClose } from 'react-icons/io5'
import { BiUser } from "react-icons/bi"
import {MdOutlineLocalOffer} from "react-icons/md"

export default function ActiveFiltersIndicator({ filters, changeStatusInFilters, changeSalesPersonInFilters }) {
    
    const activeStatuses = (Object.keys(filters.status)).filter(key => filters.status[key] === true)
    
    function getActiveStatuses() {
        const activeStatusesDescribed = (activeStatuses.map(status => statusDescription(status))).join(', ')
        return activeStatusesDescribed
    }

    const activeSalesPersons = ((Object.values(filters.salesPersons)).map(user => user.value))

    function getActiveSalesPersons() {
        return activeSalesPersons.length > 2 ? `${activeSalesPersons[0] + ', ' + activeSalesPersons[1]} , +${activeSalesPersons.length - 2}` : activeSalesPersons.join(', ')
    }

    return (
        <div className='h-100'>
            {activeStatuses.length < (Object.keys(filters.status)).length ?
                <ButtonGroup className='d-none h-100 d-md-inline filter-indicator filter-indicator-status'>
                    <Button className='h-100 filter-icon'><MdOutlineLocalOffer/></Button>
                    <Button className='h-100 filter-description'>{getActiveStatuses().length > 0 ? getActiveStatuses() : 'Status niewybrany'} </Button>
                    <Button className='h-100' onClick={() => changeStatusInFilters('all')}><IoClose /></Button>
                </ButtonGroup>
                : ''
            }
            {activeSalesPersons.length < salesPersons.length ?
                <ButtonGroup className='d-none h-100 d-md-inline filter-indicator filter-indicator-status'>
                    <Button className='h-100 filter-icon'><BiUser/></Button>
                    <Button className='h-100 filter-description'>{getActiveSalesPersons().length > 0 ? getActiveSalesPersons() : 'Handlowciec niewybrany'} </Button>
                    <Button className='h-100' onClick={() => changeSalesPersonInFilters('all')}><IoClose /></Button>
                </ButtonGroup>
                : ''
            }
            {activeStatuses.length < (Object.keys(filters.status)).length ?
                <ButtonGroup size='sm' className='d-inline d-md-none filter-indicator filter-indicator-status'>
                    <Button className='filter-icon'><MdOutlineLocalOffer/></Button>
                    <Button className='filter-description'>Status filtrowany</Button>
                    <Button onClick={() => changeStatusInFilters('all')}><IoClose /></Button>
                </ButtonGroup>
                : ''
            }
            {activeSalesPersons.length < salesPersons.length ?
                <ButtonGroup size='sm' className='d-inline d-md-none filter-indicator filter-indicator-status'>
                    <Button className='filter-icon'><BiUser/></Button>
                    <Button className='filter-description'>Handlowcy filtrowani</Button>
                    <Button onClick={() => changeSalesPersonInFilters('all')}><IoClose /></Button>
                </ButtonGroup>
                : ''
            }
        </div>


        
    )

}