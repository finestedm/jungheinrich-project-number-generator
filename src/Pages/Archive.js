import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, updatePost } from '../actions/posts'
import ArchivedProject from './components/ArchivedProject';
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap'
import EditPostModal from './components/EditPostModal'
import { ArrowDown } from 'react-bootstrap-icons';
import PaginatedItems from './PaginatedItems';
import SearchBar from './components/SearchBar';
import searchPosts from './components/searchPosts';

export default function Archive() {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    const [showModal, setShowModal] = useState(false)
    const [postData, setPostData] = useState(null)
    const [postToEditId, setPostToEditId] = useState(null);
    const [searchedPhrase, setSearchedPhrase] = useState('')

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

    function requestSearchedPosts() {
        searchPosts(searchedPhrase)
    }

    return (
        <Container className='main my-5 px-4 '>
            <Row>
                {posts.length === 0 && <Spinner animation='border' variant='warning' />}
            </Row>
            <Row className='d-flex align-items-end justify-content-between search-container py-5 px-2 text-end'>
                <h3 className='col-auto main--heading'>Projekty</h3>
                <SearchBar searchedPhrase={searchedPhrase} setSearchedPhrase={setSearchedPhrase} requestSearchedPosts={requestSearchedPosts} />
            </Row>
            <PaginatedItems toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} itemsPerPage={15} />
            {showModal && <EditPostModal postData={postData} setPostData={setPostData} setShowModal={setShowModal} showModal={showModal} setPostToEditId={setPostToEditId} />}
        </Container>
    )
}