import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, updatePost } from '../actions/posts'
import ArchivedProject from './components/ArchivedProject';
import { Container, Row, Col, Spinner, Card, Table } from 'react-bootstrap'
import EditPostModal from './components/EditPostModal'
import { ArrowDown } from 'react-bootstrap-icons';
import PaginatedItems from './PaginatedItems';
import SearchBar from './components/SearchBar';
import searchPosts from './components/searchPosts';
import getPostsNotOlderThan24h from './components/newPostsCounter';
import NewProjectCounter from './components/NewProjectCounter';

export default function Archive() {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
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
        searchedPhrase.length >= 3 && setFilteredPosts(searchPosts(posts, searchedPhrase))
        searchedPhrase === '' && setFilteredPosts({})
    }, [posts, searchedPhrase])

    return (
        <Container className='main my-5 px-4 '>
            <Row className='d-flex align-items-end justify-content-center justify-content-sm-between search-container py-5 px-2 text-end gap-3'>
                <header className='col-auto main--heading d-flex flex-column flex-md-row align-items-center gap-2'>
                    <h2 className='m-0'>Projekty</h2>
                    <NewProjectCounter postsThisDay={postsThisDay} />
                </header>
                <SearchBar searchedPhrase={searchedPhrase} setSearchedPhrase={setSearchedPhrase} />
            </Row>
            {
                posts.length === 0 ?
                <Spinner animation='border' variant='warning' /> :
                (searchedPhrase.length > 2 && filteredPosts.length === 0) ?
                    <Row>
                        <Table className='text-center'>
                                <thead>
                                    <tr>
                                        <th><h4 className='p-4'>Brak wyników</h4></th>
                                    </tr>
                                </thead>        
                        </Table>
                    </Row> :
                    <PaginatedItems posts={(filteredPosts.length > 0) ? filteredPosts : posts} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} itemsPerPage={15} />
            }

            {showModal && <EditPostModal postData={postData} setPostData={setPostData} setShowModal={setShowModal} showModal={showModal} setPostToEditId={setPostToEditId} />}
        </Container>
    )
}