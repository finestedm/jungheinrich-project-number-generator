import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, updatePost } from '../actions/posts'
import ArchivedProject from './components/ArchivedProject';
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import EditPostModal from './components/EditPostModal'
import { ArrowDown } from 'react-bootstrap-icons';
import PaginatedItems from './PaginatedItems';

export default function Archive() {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    const [showModal, setShowModal] = useState(false)
    const [postData, setPostData] = useState(null)
    const [postToEditId, setPostToEditId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    const postToEdit = useSelector((state) => postToEditId ? state.posts.find((p) => p._id === postToEditId) : null)

    useEffect(() => {
        if (postToEdit) {
            setPostData(postToEdit)
            setShowModal(true)
        }
    }, [postToEdit, setPostToEditId]);
   
    function toggleModalVisible(id) {
        setPostToEditId(id);
    }

    return (
        <Container className='main mt-4 p-4 '>
            <PaginatedItems toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} itemsPerPage={15} />
            {posts.length === 0 && <Spinner animation='border' variant='warning' />}
            {showModal && <EditPostModal postData={postData} setPostData={setPostData} setShowModal={setShowModal} showModal={showModal} setPostToEditId={setPostToEditId} />}
        </Container>
    )
}