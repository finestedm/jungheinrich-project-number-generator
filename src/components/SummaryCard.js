import React from 'react'
import { Card } from 'react-bootstrap'

export default function SummaryCard(props) {
    return (
        <Card className={`summary-cards ${props.classAddition} h-100 p-2`} >
            <Card.Header className='pb-0'>
                <span>{props.header}:</span>
            </Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-end">
                <h4>{props.main}</h4>
                <span>{props.image}</span>
            </Card.Body>
        </Card>
    )
}