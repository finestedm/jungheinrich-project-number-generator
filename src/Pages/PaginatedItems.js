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
import { activeStatusCounter } from '../components/StatusToggler';
import { activeUserCounter } from '../components/UserToggler';
import { AiOutlineNumber } from "react-icons/ai"
import { TbBuildingWarehouse } from "react-icons/tb"
import {MdOutlineDescription, MdOutlineDateRange, MdOutlineLocationOn, MdOutlineLocalOffer, MdOutlineCardTravel, MdOutlineArrowForwardIos, MdOutlineArrowBackIos} from 'react-icons/md'
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;


export function Items({ currentItems, toggleModalVisible, setPostToEditId, minimalMode }) {
  
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })


  const posts = useSelector((state) => state.posts)
  
  if (currentItems && posts.length > 0) {
    return currentItems.map((post) =>
      (<ArchivedProject toggleModalVisible={toggleModalVisible} key={post._id} setPostToEditId={setPostToEditId} post={post} minimalMode={minimalMode} />))
  } else if (!currentItems && posts.length > 0) {
    return <NoSearchResults />
  } else {
    return Array(15).fill(<ArchivedProjectPlaceholder />)
  }
}

function PaginatorForward() {
  return (
    <Row className='px-1 d-flex align-items-center'>
      <Col className='d-none d-md-block px-1'>
        Dalej
      </Col>
      <Col className='d-flex align-items-center px-1'>
        <MdOutlineArrowForwardIos />
      </Col>
    </Row>
  )
}

function PaginatorBackward() {
  return (
    <Row className='px-1 d-flex align-items-center'>
      <Col className='d-flex align-items-center px-1'>
        <MdOutlineArrowBackIos />
      </Col>
      <Col className='d-none d-md-block px-1'>
        Wstecz
      </Col>
    </Row>
  )
}

export default function PaginatedItems(props) {
    const { toggleModalVisible, setPostToEditId, itemsPerPage, posts, filters} = props

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
      <Row className='table-holder'>
        <Table hover className='table-ps m-0'>
            <thead>
            <tr className='table--head'> 
              <th><span className='d-flex align-items-center gap-1'><AiOutlineNumber size='1.2em'/> Numer</span></th>
              <th><span className='d-none d-lg-flex align-items-center gap-1'><MdOutlineLocalOffer size='1.2em'/> Status</span> <span className='d-flex d-lg-none align-items-center'><MdOutlineLocalOffer size='1.2em'/> St.</span></th>
              <th><span className='d-flex align-items-center gap-1'><TbBuildingWarehouse size='1.2em'/> Klient</span></th>
              <th className='d-none d-xxl-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineLocationOn size='1.2em'/> Lokalizacja</span></th>
              <th className='d-none d-xl-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineDescription size='1.2em'/> Opis</span></th>
              <th className='d-none d-md-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineCardTravel /> Handlowiec </span></th>
              <th className='d-none d-lg-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineDateRange size='1.2em'/> Utworzono</span></th>
              <th className='edit-column'></th>
            </tr>
          </thead>

          <tbody>
              <Items currentItems={currentItems} toggleModalVisible={toggleModalVisible} setPostToEditId={setPostToEditId} />
          </tbody>
        </Table>     
        <ReactPaginate
          className='paginator mb-0 py-3 d-flex justify-content-center align-items-center text-center'
          breakLabel="..."
          nextLabel={<PaginatorForward />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={<PaginatorBackward />}
          renderOnZeroPageCount={null}
        />
      </Row>
    );
}

  