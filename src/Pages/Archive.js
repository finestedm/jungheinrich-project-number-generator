import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, createStore } from 'react-redux'
import { getPosts } from '../actions/posts'
import { Container, Row, Col, Spinner, Card, Table } from 'react-bootstrap'
import EditPostModal from '../components/EditPostModal'
import PaginatedItems from './PaginatedItems';
import SearchBar from '../components/SearchBar';
import searchPosts from '../components/searchPosts';
import getPostsNotOlderThan24h from '../components/newPostsCounter';
import NewProjectCounter from '../components/NewProjectCounter';
import { users } from '../data/users'

export default function Archive() {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const [filters, setFilters] = useState({
        searchedPhrase: '',
        status: { 0: true, 1: true, 2: true },
        users: users
    });
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState(null);
    const [postToEditId, setPostToEditId] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState({});
    const [postsThisDay, setPostsThisDay] = useState(0)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    useEffect(() => {
        setPostsThisDay(getPostsNotOlderThan24h(posts))
    }, [posts])

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

    useEffect(() => {      
        setFilteredPosts(searchPosts(posts, filters));
    }, [posts, filters])
    
    function changeSearchedPhrase(text) {
        setFilters({...filters, searchedPhrase: text});
    }

    function changeStatusInFilters(selectedStatus) {
        let statusObject = filters.status;
        if (selectedStatus === 'all') {
            let filtersUpdated = (Object.values(statusObject).every(status => status === true)) ? { ...filters, status: { 0: false, 1: false, 2: false } } : { ...filters, status: { 0: true, 1: true, 2: true } }
            setFilters(filtersUpdated)
        } else if (filters.status[selectedStatus]) {
            statusObject = { ...statusObject, [selectedStatus]: false }
            let filtersUpdated = { ...filters, status: statusObject }
            setFilters(filtersUpdated)
        } else {
            statusObject = {...statusObject, [selectedStatus]: true}
            let filtersUpdated = { ...filters, status: statusObject }
            setFilters(filtersUpdated)
        }
    }

    function changeUserInFilters(selectedUser) {
        console.log(selectedUser)
    }
    
    return (
        <Container className='main my-5'>
            <div className='table-container px-2'>
                <Row className='d-flex flex-column flex-sm-row justify-content-between search-container py-4 px-2 gap-3'>
                    <Col className='col-auto'>
                        <h2 className='mb-4'>Projekty</h2>
                        <NewProjectCounter className='align' postsThisDay={postsThisDay} />
                    </Col>
                    <Col  className='col-auto col-sm-4 main--search-bar mt-auto'>
                        <SearchBar searchedPhrase={filters.searchedPhrase} changeSearchedPhrase={changeSearchedPhrase} />
                    </Col>
                </Row>
                
                <PaginatedItems changeStatusInFilters={changeStatusInFilters} changeUserInFilters={changeUserInFilters} filters={filters} posts={filteredPosts} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} itemsPerPage={15} />
                
                {showModal && <EditPostModal postData={postData} setPostData={setPostData} setShowModal={setShowModal} showModal={showModal} setPostToEditId={setPostToEditId} />}
            </div>
        </Container>
    )
}