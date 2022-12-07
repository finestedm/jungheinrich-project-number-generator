import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {  Row, Col, Table} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux'
import ArchivedProject from '../components/ArchivedProject';

function Items({ currentItems, toggleModalVisible, setPostToEditId}) {
    return (
        currentItems &&
            currentItems.map((post) => (
            <ArchivedProject toggleModalVisible={toggleModalVisible} key={post._id} setPostToEditId={setPostToEditId} post={post} />
        ))
    );
  }
  

export default function PaginatedItems(props) {
    const { toggleModalVisible, setPostToEditId, itemsPerPage, posts} = props

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = posts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(posts.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % posts.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
     
    return (
      <Row>
        <Table hover>
            <thead>
            <tr className='table--head' style={{ height: '3rem' }}> 
                <th> </th>
                <th>Numer </th>
                <th>Klient</th>
                <th>Miejscowość</th>
                <th className='d-none d-lg-table-cell'>Opis</th>
                <th className='d-none d-md-table-cell'>Handlowiec</th>
                <th className='d-none d-md-table-cell'>Utworzono</th>
              </tr>
            </thead>
            <tbody>
              <Items currentItems={currentItems} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} />
          </tbody>
          <tfoot className='table--foot'>
            <tr>
              <td colSpan="6">
                <ReactPaginate
                  className='paginator d-flex justify-content-center text-center'
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                />
              </td>
            </tr>
          </tfoot>
        </Table>     
      </Row>
    );
}

  