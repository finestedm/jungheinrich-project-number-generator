import React from 'react'
import { users } from '../data/users'

export default function AcitveFiltersIndicator({ filters }) {
    
    if (!(Object.values(filters.status)).every(val => val === true) || filters.users.length !== users.length) {
        return(
            <div>Tu pojawi się info o filtrach</div>
        )
    }

}