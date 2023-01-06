import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Card } from 'react-bootstrap'
import { users } from '../data/users'
import SummaryCard from './SummaryCard'

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
        <SummaryCard header='Najaktywniejszy' main={mostActiveUser(usersInPosts)} image={mostActiveUserPhoto} classAddition='user-activity-counter' />
    )
}