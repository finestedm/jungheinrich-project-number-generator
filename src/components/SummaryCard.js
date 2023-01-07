import React from 'react'
import { Card } from 'react-bootstrap'

export default function SummaryCard(props) {
    return (
        <Card className={`summary-cards ${props.classAddition} h-100 p-2`} >
            <Card.Header className='pb-0'>
                <span>{props.header}:</span>
            </Card.Header>
            <Card.Body className="d-flex justify-content-stretch align-items-end py-2">
                <div className="d-flex w-100 justify-content-between align-items-end gap-2">
                    <h4>{props.main}</h4>
                    {props.image.type === 'img' ? 
                        <div className='summary-card--image'>{props.image}</div>
                        :
                        <div className='summary-card--svg rounded d-flex align-items-center justify-content-center flex-shrink-0'>{props.image}</div>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}