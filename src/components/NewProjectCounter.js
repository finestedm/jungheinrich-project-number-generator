import React from "react";
import {Col, Card} from 'react-bootstrap'
import {IoTrendingUp} from 'react-icons/io5'

export default function NewProjectCounter({postsThisDay}){
    return (
        postsThisDay > 0 ?
            (<Card className='new-post-counter active h-100'>
                <Card.Header>    
                    <span className='fw-normal'>Ostatnie 24h:</span>
                </Card.Header>
                <Card.Body className="text-center fs-3">
                    {postsThisDay} <IoTrendingUp style={{ scale: '1.4' }} className="ms-1 new-project-counter-icon" />
                </Card.Body>
            </Card>)
            :
            (<Col className='p-2 px-3 fw-normal new-post-counter col-auto'>Brak nowych projektów </Col>)
    )
}