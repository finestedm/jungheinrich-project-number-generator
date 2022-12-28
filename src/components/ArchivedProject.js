import React from "react";
import { Row, Col, Card, Image, Button} from 'react-bootstrap';
import {users} from '../data/users'
import moment from 'moment';
import 'moment/locale/pl' 
import StatusIndicator from "../components/StatusIndicator";
import {IoOpenOutline} from 'react-icons/io5';
import {FiEdit} from 'react-icons/fi';

moment.locale('pl');

export default function ArchivedProject(props) {
    const { setPostToEdit, toggleModalVisible, post } = props
    const searchedUser = users.filter(user => user.value === post.user)[0]
    const {projectNumber, user, location, description, customer, createdAt, status} = post

    return (
        <tr>
            <td className="table--status">{status !== null ? (<StatusIndicator status={status} />) : 'brak'} </td>
            <td><span className="strong">{projectNumber}</span></td>
            <td className="d-table-cell d-lg-none table--customer" style={{lineHeight: '1.3rem'}}>{customer} <br /><span style={{opacity: '.5'}}>{location}</span></td>
            <td className="d-none d-lg-table-cell table--customer">{customer}</td>
            <td className="d-none d-lg-table-cell table--location">{location}</td>
            <td className='d-none d-lg-table-cell' data-bs-toggle={description.length > 21 ? "tooltip" : 'disabled'} data-bs-placement="top" data-bs-title={description} data-bs-custom-class="ps-tooltip">{description}</td>
            <td className='d-none d-md-table-cell'>
                <div className='d-flex align-items-center'>
                    {(searchedUser && searchedUser.photo) && <Image src={searchedUser.photo} className='me-2' roundedCircle style={{ height: '1.75rem' }} />}
                    {user}
                </div>
            </td>
            <td className='d-none d-md-table-cell'> {moment(createdAt).fromNow()} </td>
            <td><FiEdit onClick={() => toggleModalVisible(post._id)} className='p-2 m-0 project-edit-icon' /></td>
        </tr>
    )

}