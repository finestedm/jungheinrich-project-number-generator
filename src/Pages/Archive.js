import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, updatePost } from '../actions/posts'
import ArchivedProject from './components/ArchivedProject';
import {Container} from 'react-bootstrap'


export default function Archive() {
    const posts = useSelector((state) => state.posts)
    const [currentId, setCurrentId] = useState(null);

    function editPost(id) {
        console.log(id)
    }

    return (
        <Container className='main'>
            {posts.map(post => <ArchivedProject editPost={editPost} key={post._id} currentId={currentId} setCurrentId={setCurrentId} post={post} />)}
        </Container>
    )
}