import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'
import { Container, Row, Col, Spinner, Card, Table } from 'react-bootstrap'
import EditPostModal from '../components/EditPostModal'
import PaginatedItems from './PaginatedItems';
import SearchBar from '../components/SearchBar';
import searchPosts from '../components/searchPosts';
import getPostsNotOlderThan24h from '../components/newPostsCounter';
import NewProjectCounter from '../components/NewProjectCounter';
import NoSearchResults from '../components/NoSearchResults'

export default function Archive() {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const [filters, setFilters] = useState({
        searchedPhrase: null,
        status: []
    });
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState(null);
    const [postToEditId, setPostToEditId] = useState(null);
    const [searchedPhrase, setSearchedPhrase] = useState('');
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
        searchedPhrase.length >= 3 && setFilters({ ...filters, searchedPhrase: searchedPhrase })
        searchedPhrase === '' && setFilteredPosts({})
    }, [searchedPhrase])

    useEffect(() => {
        setFilteredPosts(searchPosts(posts, filters));
    }, [posts,  filters])

    return (
        <Container className='main my-5'>
            <div className='table-container px-2'>
                <Row className='d-flex flex-column flex-sm-row justify-content-between search-container py-4 px-2 gap-3'>
                    <Col className='col-auto'>
                        <h2 className='mb-4'>Projekty</h2>
                        <NewProjectCounter className='align' postsThisDay={postsThisDay} />
                    </Col>
                    <Col  className='col-auto col-sm-4 main--search-bar mt-auto'>
                        <SearchBar searchedPhrase={searchedPhrase} setSearchedPhrase={setSearchedPhrase} />
                    </Col>
                </Row>
                {
                    (searchedPhrase.length >= 3 && filteredPosts.length === 0) ?
                        <NoSearchResults /> :
                        <PaginatedItems posts={(filteredPosts.length > 0) ? filteredPosts : posts} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} itemsPerPage={15} />
                }

                {showModal && <EditPostModal postData={postData} setPostData={setPostData} setShowModal={setShowModal} showModal={showModal} setPostToEditId={setPostToEditId} />}
            </div>
        </Container>
    )
}