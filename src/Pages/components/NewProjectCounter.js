import React from "react";
import {Col} from 'react-bootstrap'
import {ImArrowUpRight2} from 'react-icons/im'

export default function NewProjectCounter({postsThisDay}){
    return (
        postsThisDay > 0 ?
            (<Col className='fs-6 p-2 px-3 new-post-counter active col-auto'><span className='me-2 fw-normal'>Ostatnie 24h:</span> {postsThisDay} <ImArrowUpRight2 className="ms-1 new-project-counter-icon"/></Col>)
            :
            (<Col className='fs-6 p-2 px-3 fw-normal new-post-counter col-auto'>Brak nowych projektów </Col>)
    )
}