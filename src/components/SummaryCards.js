import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { salesPersons } from '../data/salesPersons'
import moment from 'moment'
import SummaryCard from './SummaryCard'
import {AiOutlineFundProjectionScreen, AiOutlineUserAdd} from 'react-icons/ai'

// Nowe projekty
export function getNewPostsNumber(posts) {
    return posts.filter(post => moment().diff(moment(post.createdAt), 'weeks') <= 1).length      // returns projects not older than 1 day
}

export default function SummaryCards() {
    
    const posts = useSelector((state) => state.posts)
    const salesPersonsInPosts = posts.map(post => post.user)
    
    
    // Najaktywniejszy handlowiec
    function mostActiveSalesPerson(arr) {
        const store = {}
        arr.forEach((num) => store[num] ? store[num] += 1 : store[num] = 1)
        return Object.keys(store).sort((a, b) => store[b] - store[a])[0]
    }

    const mostActiveSalesPersonPhoto = (salesPersonsInPosts.length > 0) ? salesPersons.filter(user => user.value === mostActiveSalesPerson(salesPersonsInPosts) && user.photo)[0].photo : ''

    // Nowi klienci

    const postsThisPeriod = posts.filter(post => moment().diff(moment(post.createdAt), 'weeks') <= 1)
    const postsBeforeThisPeriod = posts.filter(post => moment().diff(moment(post.createdAt), 'weeks') > 1)

    const customersInPostsThisPeriod = postsThisPeriod.map(post => post.customer)
    const customersInPostsBeforeThisPeriod = postsBeforeThisPeriod.map(post => post.customer)

    const onlyNewCustomers = customersInPostsThisPeriod.filter(customer => !customersInPostsBeforeThisPeriod.includes(customer))


    return (
        <Row className='mb-3'>
            <Col className='mb-4 col-12 col-md-6 col-lg-4'>
                <SummaryCard header='Nowe projekty' main={getNewPostsNumber(posts) === 0 ? 'Brak nowych projektów' : getNewPostsNumber(posts) } image={<AiOutlineFundProjectionScreen size='40px'/>} classAddition='new-post-counter' />
            </Col>
            <Col className='mb-4 col-12 col-md-6 col-lg-4'>
                <SummaryCard header='Najaktywniejszy' main={mostActiveSalesPerson(salesPersonsInPosts)} image={<img src={mostActiveSalesPersonPhoto} />} classAddition='user-activity-counter' />
            </Col>
            <Col className='mb-4 col-12 col-md-6 col-lg-4'>
                <SummaryCard header='Nowi klienci' main={onlyNewCustomers.length} image={<AiOutlineUserAdd size='40px'/>} classAddition='new-customers-counter' />
            </Col>
        </Row>
    )
}