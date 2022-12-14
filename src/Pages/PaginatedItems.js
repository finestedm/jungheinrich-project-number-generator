import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {  Row, Col, Table, Dropdown} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux'
import ArchivedProject from '../components/ArchivedProject';
import ArchivedProjectPlaceholder from '../components/ArchivedProjectPlaceholder';
import StatusToggler from '../components/StatusToggler'
import UserToggler from '../components/UserToggler';
import NoSearchResults from '../components/NoSearchResults'
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;


function Items({ currentItems, toggleModalVisible, setPostToEditId }) {
  
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })


  const posts = useSelector((state) => state.posts)
  
  if (currentItems && posts.length > 0) {
    return currentItems.map((post) =>
      (<ArchivedProject toggleModalVisible={toggleModalVisible} key={post._id} setPostToEditId={setPostToEditId} post={post} />))
  } else if (!currentItems && posts.length > 0) {
    return <NoSearchResults />
  } else {
    return Array(15).fill(<ArchivedProjectPlaceholder />)
  }
}
  

export default function PaginatedItems(props) {
    const { toggleModalVisible, setPostToEditId, itemsPerPage, posts, filters, changeStatusInFilters, changeUserInFilters} = props

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = (posts.length > 0) && posts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(posts.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % posts.length;
      setItemOffset(newOffset);
    };
  
     
    return (
      <Row className='table-holder mt-4'>
        <Table hover className='table-ps m-0'>
            <thead>
            <tr className='table--head'> 
              <th className='align-middle'><StatusToggler changeStatusInFilters={changeStatusInFilters} filters={filters} /></th>
              <th>Numer</th>
              <th>Klient</th>
              <th className='d-none d-xl-table-cell'>Lokalizacja</th>
              <th className='d-none d-xl-table-cell'>Opis</th>
              <th className='d-none d-md-table-cell'><UserToggler changeUserInFilters={changeUserInFilters} filters={filters} /></th>
              <th className='d-none d-lg-table-cell'>Utworzono</th>
              <th className='edit-column'></th>
            </tr>
          </thead>

          <tbody>
              <Items currentItems={currentItems} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} />
          </tbody>

          <tfoot className='table--foot'>
            <tr>
              <td colSpan="8">
                <ReactPaginate
                  className='paginator d-flex justify-content-center text-center'
                  breakLabel="..."
                  nextLabel="Nast??pna"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="Wstecz"
                  renderOnZeroPageCount={null}
                />
              </td>
            </tr>
          </tfoot>
        </Table>     
      </Row>
    );
}

  