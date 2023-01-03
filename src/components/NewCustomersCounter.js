import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Card } from 'react-bootstrap'
import moment from 'moment'

export default function NewCustomersCounter() {
    
    const posts = useSelector((state) => state.posts)
    const postsThisMonth = posts.filter(post => moment().diff(moment(post.createdAt), 'months') <= 1)
    const postsBeforeThisMonth = posts.filter(post => moment().diff(moment(post.createdAt), 'months') > 1)

    const customersInPosts = posts.map(post => post.customer)

    return (
        <Card className='summary-cards user-activity-counter h-100 p-2'>
            <Card.Header className='pb-0'>
                <span>Najaktywniejszy:</span>
            </Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-end fs-5">
  
            </Card.Body>
        </Card>
    )
}