import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, updatePost } from '../actions/posts'
import ArchivedProject from './components/ArchivedProject';
import {Container} from 'react-bootstrap'


export default function Archive() {
    const posts = useSelector((state) => state.posts)
    const [currentId, setCurrentId] = useState(null);
    return (
        <Container className='main'>
            {posts.map(post => <ArchivedProject key={post._id} currentId={currentId} setCurrentId={setCurrentId} post={post} />)}
        </Container>
    )
}