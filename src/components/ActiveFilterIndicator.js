import React from 'react'
import {Button, ButtonGroup, Col} from 'react-bootstrap'
import { users } from '../data/users'
import { statusDescription } from './StatusIndicator'
import {IoClose} from 'react-icons/io5'

export default function ActiveFiltersIndicator({ filters, changeStatusInFilters, changeUserInFilters }) {
    
    const activeStatuses = (Object.keys(filters.status)).filter(key => filters.status[key] === true)
    
    function getActiveStatuses() {
        const activeStatusesDescribed = (activeStatuses.map(status => statusDescription(status))).join(', ')
        return activeStatusesDescribed
    }

    const activeUsers = ((Object.values(filters.users)).map(user => user.value))

    function getActiveUsers() {
        return activeUsers.length > 2 ? `${activeUsers[0] + ', ' + activeUsers[1]} , +${activeUsers.length - 2}` : activeUsers.join(', ')
    }

    return (
        <Col className='d-flex gap-2 align-items-center'>
            {activeStatuses.length < (Object.keys(filters.status)).length ?
                <ButtonGroup className='d-none d-md-inline filter-indicator filter-indicator-status'>
                    <Button>{getActiveStatuses().length > 0 ? getActiveStatuses() : 'Status niewybrany'} </Button>
                    <Button onClick={() => changeStatusInFilters('all')}><IoClose /></Button>
                </ButtonGroup>
                : ''
            }
            {activeUsers.length < users.length ?
                <ButtonGroup className='d-none d-md-inline filter-indicator filter-indicator-status'>
                    <Button>{getActiveUsers().length > 0 ? getActiveUsers() : 'Handlowciec niewybrany'} </Button>
                    <Button onClick={() => changeUserInFilters('all')}><IoClose /></Button>
                </ButtonGroup>
                : ''
            }
            {activeStatuses.length < (Object.keys(filters.status)).length ?
                <ButtonGroup size='sm' className='d-inline d-md-none filter-indicator filter-indicator-status'>
                    <Button>Status filtrowany</Button>
                    <Button onClick={() => changeStatusInFilters('all')}><IoClose /></Button>
                </ButtonGroup>
                : ''
            }
            {activeUsers.length < users.length ?
                <ButtonGroup size='sm' className='d-inline d-md-none filter-indicator filter-indicator-status'>
                    <Button>Handlowcy filtrowani</Button>
                    <Button onClick={() => changeUserInFilters('all')}><IoClose /></Button>
                </ButtonGroup>
                : ''
            }
        </Col>


        
    )

}