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

    const mostAciveUserPhoto = (usersInPosts.length > 0) ? users.filter(user => user.value === mostActiveUser(usersInPosts) && user.photo)[0].photo : ''

    return (
        <Card className='user-activity-counter'>
            <Card.Header>
                <span className='fw-normal'>Najaktywniejszy:</span>
            </Card.Header>
            <Card.Body className="text-center d-flex gap-2 justify-content-center align-items-center fs-5">
                <img src={mostAciveUserPhoto} style={{height: '3.25rem'}} />{mostActiveUser(usersInPosts)}
            </Card.Body>
        </Card>
    )
}