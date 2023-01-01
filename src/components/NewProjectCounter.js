import React from "react";
import {Col, Card} from 'react-bootstrap'
import {IoTrendingUp} from 'react-icons/io5'

export default function NewProjectCounter({postsThisDay}){
    return (
        postsThisDay > 0 ?
            (<Card className='summary-cards new-post-counter active h-100'>
                <Card.Header>    
                    <span>Ostatnie 24h:</span>
                </Card.Header>
                <Card.Body className="fs-2 fw-bold d-flex justify-content-between align-items-end">
                    {postsThisDay} <IoTrendingUp size={'5rem'} className="ms-1 new-project-counter-icon" />
                </Card.Body>
            </Card>)
            :
            (<Col className='p-2 px-3 new-post-counter col-auto'>Brak nowych projektów </Col>)
    )
}