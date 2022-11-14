import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, updatePost } from '../actions/posts'
import ArchivedProject from './components/ArchivedProject';
import { Container, Row } from 'react-bootstrap'
import EditPostModal from './components/EditPostModal'
import { ArrowDown } from 'react-bootstrap-icons';


export default function Archive() {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    const [showModal, setShowModal] = useState(false)
    
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    const [postToEdit, setPostToEdit] = useState(null);

    function toggleModalVisible(id) {
        setPostToEdit(id)    // i finished here. we have id, now implement function to find single post by this id so the data can be fetched into text forms in post edit modal
        setShowModal(true)
    }

    return (
        <Container className='main mt-4'>
            <Row className='d-inline-flex align-items-center col-4'>najnowsze<ArrowDown className='col-1' size={16}/></Row>
            {posts.map(post => <ArchivedProject toggleModalVisible={toggleModalVisible} key={post._id} setPostToEdit={setPostToEdit} post={post} />)}
            <EditPostModal postToEdit={postToEdit} setShowModal={setShowModal} showModal={showModal} />
        </Container>
    )
}