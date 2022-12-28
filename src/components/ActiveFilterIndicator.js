import React from 'react'
import { users } from '../data/users'
import { statusDescription } from './StatusIndicator'
import {RxCross2} from 'react-icons/rx'

export default function AcitveFiltersIndicator({ filters }) {
    
    const activeStatuses = (Object.keys(filters.status)).filter(key => filters.status[key] === true)
    const activeStatusesDescribed = activeStatuses.map(status => statusDescription(parseInt(status)))
    const activeStatusesDescribedJoined = activeStatusesDescribed.join(', ')
    
    console.log( activeStatuses.length, (Object.keys(filters.status)).length)

    return (
        activeStatuses.length < (Object.keys(filters.status)).length ?
            <span className='fs-6 p-2 w-100 d-flex align-items-center rounded mb-2 filter-indicator filter-indicator-status'>Status: {activeStatusesDescribedJoined} <RxCross2 /></span>
        : '' 
    )

    // if (!(Object.values(filters.status)).every(val => val === true) || filters.users.length !== users.length) {
    //     return(
    //         (!(Object.values(filters.status)).every(val => val === true)) && (Object.values(filters.status)).map(stat => <div>{filters.status[stat]}</div>)
    //     )
    // }

}