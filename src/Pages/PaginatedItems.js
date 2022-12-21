import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {  Row, Col, Table, Dropdown} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux'
import ArchivedProject from '../components/ArchivedProject';
import ArchivedProjectPlaceholder from '../components/ArchivedProjectPlaceholder';
import StatusToggler from '../components/StatusToggler'
import NoSearchResults from '../components/NoSearchResults'


function Items({ currentItems, toggleModalVisible, setPostToEditId }) {
  const posts = useSelector((state) => state.posts)
  return (
    (currentItems && posts.length > 0) ? 
      currentItems.map((post) =>
        (<ArchivedProject toggleModalVisible={toggleModalVisible} key={post._id} setPostToEditId={setPostToEditId} post={post} />))
        :
        Array(15).fill(<ArchivedProjectPlaceholder />)
  );
}
  

export default function PaginatedItems(props) {
    const { toggleModalVisible, setPostToEditId, itemsPerPage, posts, filters, changeStatusInFilters} = props

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
      <Row>
        <Table hover>
            <thead>
            <tr className='table--head text-uppercase'> 
              <th><StatusToggler changeStatusInFilters={changeStatusInFilters} filters={filters} /></th>
              <th>Numer</th>
              <th>Klient</th>
              <th>Lokalizacja</th>
              <th className='d-none d-lg-table-cell'>Opis</th>
              <th className='d-none d-md-table-cell'>Handlowiec</th>
              <th className='d-none d-md-table-cell'>Utworzono</th>
            </tr>
          </thead>

          {currentItems.length > 0 ?
            (<tbody>
              <Items currentItems={currentItems} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} />
            </tbody>) : <NoSearchResults />}
          <tfoot className='table--foot'>
            <tr>
              <td colSpan="7">
                <ReactPaginate
                  className='paginator d-flex justify-content-center text-center'
                  breakLabel="..."
                  nextLabel="Następna"
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

  