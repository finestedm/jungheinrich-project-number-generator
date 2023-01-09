import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, createStore } from 'react-redux'
import { getPosts } from '../actions/posts'
import moment from 'moment'
import { Container, Row, Col, Spinner, Card, Table } from 'react-bootstrap'
import EditPostModal from '../components/EditPostModal'
import PaginatedItems from './PaginatedItems';
import SearchBar from '../components/SearchBar';
import searchPosts from '../components/searchPosts';
import ActiveFiltersIndicator from '../components/ActiveFilterIndicator'
import SummaryCards from '../components/SummaryCards'
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
        let usersFiltered = filters.users;
        if (selectedUser === 'all') {
            usersFiltered.length === users.length ? usersFiltered = [] : usersFiltered = users;
            setFilters({ ...filters, users: usersFiltered })
        } else {
            if ((usersFiltered.filter(user => user.value === selectedUser)).length > 0) {
                const usersReduced = usersFiltered.filter(user => user.value !== selectedUser)
                setFilters({ ...filters, users: usersReduced })
            } else if ((usersFiltered.filter(user => user.value === selectedUser)).length === 0) {
                const foundUserObject = (users.filter(user => user.value === selectedUser))
                const usersMerged = usersFiltered.concat(foundUserObject)
                setFilters({ ...filters, users: usersMerged })
            }
        }
    }
    
    return (
        <Container fluid className='main w-100 px-2 px-md-4'>
            <div className='table-container mb-4'>
                <Row className='justify-content-between search-container py-4'><h1>Projekty <small class="text-muted fs-5">({posts.length})</small></h1></Row>
                <h3 className='mb-3'>Podsumowanie <br/>  <small class="text-muted fs-6">Najważniejsze informacje z tego tygodnia</small></h3>
                <SummaryCards />
                <Row className='d-flex gap-2'>
                    <h3 className='mb-3'>Archiwum <br/>  <small class="text-muted fs-6">Szukaj istniejących projektów</small></h3>
                    <ActiveFiltersIndicator filters={filters} changeStatusInFilters={changeStatusInFilters} changeUserInFilters={changeUserInFilters} />
                    <Col className='col-12 col-md-5 col-lg-4'>
                        <SearchBar searchedPhrase={filters.searchedPhrase} changeSearchedPhrase={changeSearchedPhrase} />
                    </Col>
                </Row>
                
                <PaginatedItems changeStatusInFilters={changeStatusInFilters} changeUserInFilters={changeUserInFilters} filters={filters} posts={filteredPosts} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} itemsPerPage={15} />
                
                {showModal && <EditPostModal postData={postData} setPostData={setPostData} setShowModal={setShowModal} showModal={showModal} setPostToEditId={setPostToEditId} />}
            </div>
        </Container>
    )
}