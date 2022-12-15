import React from "react";
import {Col} from 'react-bootstrap'
import {IoTrendingUp} from 'react-icons/io5'

export default function NewProjectCounter({postsThisDay}){
    return (
        postsThisDay > 0 ?
            (<Col className='fs-6 p-2 px-3 new-post-counter active col-auto'><span className='me-2 fw-normal'>Ostatnie 24h:</span> {postsThisDay} <IoTrendingUp style={{scale: '1.4'}}className="ms-1 new-project-counter-icon"/></Col>)
            :
            (<Col className='fs-6 p-2 px-3 fw-normal new-post-counter col-auto'>Brak nowych projektów </Col>)
    )
}