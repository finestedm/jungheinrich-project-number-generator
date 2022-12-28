import React from 'react'
import { users } from '../data/users'

export default function AcitveFiltersIndicator({ filters }) {
    
    (Object.keys(filters.status)).map(stat => console.log(filters.status[stat]))

    return(
        (!(Object.keys(filters.status)).every(val => val === true)) &&
        <div>{((Object.keys(filters.status)).filter(key => filters.status[key] === true))}</div>
    )

    // if (!(Object.values(filters.status)).every(val => val === true) || filters.users.length !== users.length) {
    //     return(
    //         (!(Object.values(filters.status)).every(val => val === true)) && (Object.values(filters.status)).map(stat => <div>{filters.status[stat]}</div>)
    //     )
    // }

}