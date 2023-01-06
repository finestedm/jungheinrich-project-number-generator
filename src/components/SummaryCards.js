import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { users } from '../data/users'
import moment from 'moment'
import SummaryCard from './SummaryCard'
import {AiOutlineFundProjectionScreen, AiOutlineUserAdd} from 'react-icons/ai'


export default function SummaryCards() {
    
    const posts = useSelector((state) => state.posts)
    const usersInPosts = posts.map(post => post.user)
    
    // Nowe projekty
    function getPostsNotOlderThan24h() {
        const numberOfNewPosts = posts.filter(post => moment().diff(moment(post.createdAt), 'days') <= 1).length      // returns projects not older than 1 day
        return numberOfNewPosts === 0 ? 'Brak nowych projektów' : numberOfNewPosts;
    }
    
    // Najaktywniejszy handlowiec
    function mostActiveUser(arr) {
        const store = {}
        arr.forEach((num) => store[num] ? store[num] += 1 : store[num] = 1)
        return Object.keys(store).sort((a, b) => store[b] - store[a])[0]
    }

    const mostActiveUserPhoto = (usersInPosts.length > 0) ? users.filter(user => user.value === mostActiveUser(usersInPosts) && user.photo)[0].photo : ''

    // Nowi klienci

    const postsThisMonth = posts.filter(post => moment().diff(moment(post.createdAt), 'months') <= 1)
    const postsBeforeThisMonth = posts.filter(post => moment().diff(moment(post.createdAt), 'months') > 1)

    const customersInPostsThisMonth = postsThisMonth.map(post => post.customer)
    const customersInPostsBeforeThisMonth = postsBeforeThisMonth.map(post => post.customer)

    const onlyNewCustomers = customersInPostsThisMonth.filter(customer => !customersInPostsBeforeThisMonth.includes(customer))


    return (
        <Row className='mb-5'>
            <Col>
                <SummaryCard header='Nowe projekty' main={getPostsNotOlderThan24h()} image={<AiOutlineFundProjectionScreen/>} classAddition='new-post-counter' />
            </Col>
            <Col className='mb-4'>
                <SummaryCard header='Najaktywniejszy' main={mostActiveUser(usersInPosts)} image={<img src={mostActiveUserPhoto} />} classAddition='user-activity-counter' />
            </Col>
            <Col className='mb-4'>
                <SummaryCard header='Nowi klienci' main={onlyNewCustomers.length} image={<AiOutlineUserAdd/>} classAddition='new-customers-counter' />
            </Col>
        </Row>
    )
}