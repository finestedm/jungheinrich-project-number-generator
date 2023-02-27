import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, createStore } from 'react-redux'
import { getPosts } from '../actions/posts'
import moment from 'moment'
import { Container, Row, Col, Spinner, Card, Table, Button, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EditPostModal from '../components/EditPostModal'
import PaginatedItems from './PaginatedItems';
import SearchBar from '../components/SearchBar';
import searchPosts from '../components/searchPosts';
import ActiveFiltersIndicator from '../components/ActiveFilterIndicator'
import SummaryCards from '../components/SummaryCards'
import { salesPersons } from '../data/salesPersons'
import { useNavigate } from 'react-router-dom'
import FiltersDropdown from '../components/FiltersDropdown'
import { HiOutlineDocumentPlus } from 'react-icons/hi2'

export default function Archive() {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const [filters, setFilters] = useState({
        searchedPhrase: '',
        status: { 0: true, 1: true, 2: true },
        salesPersons: salesPersons,
        startDate: new Date(2022, 1, 1),
        endDate: new Date()
    });
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState(null);
    const [postToEditId, setPostToEditId] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState({});
    const { user } = useSelector((state => state.authSlice))
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

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
        setFilters({ ...filters, searchedPhrase: text });
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
            statusObject = { ...statusObject, [selectedStatus]: true }
            let filtersUpdated = { ...filters, status: statusObject }
            setFilters(filtersUpdated)
        }
    }

    function changeSalesPersonInFilters(selectedUser) {
        let salesPersonsFiltered = filters.salesPersons;
        if (selectedUser === 'all') {
            salesPersonsFiltered.length === salesPersons.length ? salesPersonsFiltered = [] : salesPersonsFiltered = salesPersons;
            setFilters({ ...filters, salesPersons: salesPersonsFiltered })
        } else {
            if ((salesPersonsFiltered.filter(user => user.value === selectedUser)).length > 0) {
                const salesPersonsReduced = salesPersonsFiltered.filter(user => user.value !== selectedUser)
                setFilters({ ...filters, salesPersons: salesPersonsReduced })
            } else if ((salesPersonsFiltered.filter(user => user.value === selectedUser)).length === 0) {
                const foundUserObject = (salesPersons.filter(user => user.value === selectedUser))
                const salesPersonsMerged = salesPersonsFiltered.concat(foundUserObject)
                setFilters({ ...filters, salesPersons: salesPersonsMerged })
            }
        }
    }

    function changeDateRangeInFilters(newStartDate, newEndDate) {
        setFilters({ ...filters, startDate: newStartDate, endDate: newEndDate });
    }

    return (
        <Container fluid className='main w-100 px-md-5'>
            <div className='table-container mb-4'>
                <Row className='header-row py-4 mb-5'>
                    <Col>
                        <h1 className='d-inline-flex'>Projekty
                            <small className="text-mute fs-5">({posts.length})</small>
                        </h1>
                    </Col>
                    <Col className='col-auto'>
                        <Button as={Link} to="/" className='btn-ps-outline d-flex gap-2 align-items-center'>
                            <HiOutlineDocumentPlus size='1.25em' /> <span>Dodaj projekt</span>
                        </Button>
                    </Col>
                </Row>
                <h5 className='mb-3'>Podsumowanie <br />  <small className="text-mute">Najważniejsze informacje z tego tygodnia</small></h5>

                <SummaryCards />

                <h5 className='mb-3'>Archiwum <br />  <small className="text-mute">Szukaj istniejących projektów</small></h5>


                <Row className='mb-3' >

                    <Col className='col-auto'>
                        <FiltersDropdown changeSalesPersonInFilters={changeSalesPersonInFilters} changeStatusInFilters={changeStatusInFilters} changeDateRangeInFilters={changeDateRangeInFilters} filters={filters} />
                    </Col>
                    <Col className='col-md-5 col-lg-4 col-xxl-3'>
                        <SearchBar searchedPhrase={filters.searchedPhrase} changeSearchedPhrase={changeSearchedPhrase} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ActiveFiltersIndicator filters={filters} changeStatusInFilters={changeStatusInFilters} changeSalesPersonInFilters={changeSalesPersonInFilters} />
                    </Col>
                </Row>


                <PaginatedItems changeStatusInFilters={changeStatusInFilters} changeSalesPersonInFilters={changeSalesPersonInFilters} filters={filters} posts={filteredPosts} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} itemsPerPage={15} />

                {showModal && <EditPostModal postData={postData} setPostData={setPostData} setShowModal={setShowModal} showModal={showModal} setPostToEditId={setPostToEditId} />}
                <div show  ></div>
            </div>
        </Container>
    )
}