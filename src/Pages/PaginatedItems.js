import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {  Row, Col} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux'
import ArchivedProject from './components/ArchivedProject';

function Items({ currentItems, toggleModalVisible, setPostToEditId}) {
    return (
      <>
        {currentItems &&
            currentItems.map((post) => (
                <ArchivedProject toggleModalVisible={toggleModalVisible} key={post._id} setPostToEditId={setPostToEditId} post={post} />
        ))}
      </>
    );
  }

export default function PaginatedItems(props) {
    const { toggleModalVisible, setPostToEditId } = props

    const posts = useSelector((state) => state.posts)
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + 10;
    const currentItems = posts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(posts.length / 10);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * 10) % posts.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
        <>
        <Items currentItems={currentItems} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} />
            <Row>
                <ReactPaginate
                    className='paginator text-center d-flex justify-content-center'
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </Row>
      </>
    );
}

  