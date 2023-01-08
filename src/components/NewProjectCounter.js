import React from "react";
import {Col, Card} from 'react-bootstrap'
import {IoTrendingUp} from 'react-icons/io5'

export default function NewProjectCounter({postsThisDay}){
    return (
        postsThisDay > 0 ?
            (<Card className='summary-cards new-post-counter active h-100 p-2'>
                <Card.Header className='pb-0'>    
                    <span>Ostatnie 24h:</span>
                </Card.Header>
                <Card.Body className="fs-1 fw-bold d-flex justify-content-between align-items-end">
                    {postsThisDay} <IoTrendingUp size={'5rem'} className="ms-1 new-project-counter-icon" />
                </Card.Body>
            </Card>)
            :
            (<Card className='summary-cards new-post-counter active h-100 p-2'>
                <Card.Header className='pb-0'>    
                    <span>Ostatnie 24h:</span>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-end">
                    <h3>Brak nowych projektów</h3>
                </Card.Body>
            </Card>)
    )
}