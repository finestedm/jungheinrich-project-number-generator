import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Card } from 'react-bootstrap'
import { users } from '../data/users'

export default function UserActivity() {
    
    const posts = useSelector((state) => state.posts)
    const usersInPosts = posts.map(post => post.user)
    
    function mostActiveUser(arr) {
        const store = {}
        arr.forEach((num) => store[num] ? store[num] += 1 : store[num] = 1)
        return Object.keys(store).sort((a, b) => store[b] - store[a])[0]
    }

    const mostActiveUserPhoto = (usersInPosts.length > 0) ? users.filter(user => user.value === mostActiveUser(usersInPosts) && user.photo)[0].photo : ''

    return (
        <Card className='summary-cards user-activity-counter h-100 p-2'>
            <Card.Header className='pb-0'>
                <span>Najaktywniejszy:</span>
            </Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-end fs-5">
                {mostActiveUser(usersInPosts)}
                <img src={mostActiveUserPhoto} className='card-image' style={{ height: '3.25rem' }} />
            </Card.Body>
        </Card>
    )
}