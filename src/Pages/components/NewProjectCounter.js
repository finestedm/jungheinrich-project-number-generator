import React from "react";
import {ImArrowUpRight2} from 'react-icons/im'

export default function NewProjectCounter({postsThisDay}){
    return (
        postsThisDay > 0 ?
            (<span className='ms-3 fs-6 p-2 new-post-counter active d-flex justify-content-center align-items-center'><span className='me-2 fw-normal'>Ostatnie 24h:</span> {postsThisDay} <ImArrowUpRight2 className="ms-1 new-project-counter-icon"/></span>)
            :
            (<span className='ms-3 fs-6 p-2 fw-normal new-post-counter d-flex justify-content-center'>Brak nowych projektów </span>)
    )
}