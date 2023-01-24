import React from "react";
import { Row, Col, Card, Image, Button} from 'react-bootstrap';
import {salesPersons} from '../data/salesPersons'
import moment from 'moment';
import 'moment/locale/pl' 
import StatusIndicator from "../components/StatusIndicator";
import {IoOpenOutline} from 'react-icons/io5';
import {FiEdit3} from 'react-icons/fi';

moment.locale('pl');

export default function ArchivedProject(props) {
    const { setPostToEdit, toggleModalVisible, post } = props
    const searchedSalesPerson = salesPersons.filter(user => user.value === post.user)[0]
    const {projectNumber, user, location, description, customer, createdAt, status} = post

    return (
        <tr>
            <td className="align-middle"><span className="strong">{projectNumber}</span></td>
            <td className="table--status align-middle">{status !== null ? (<StatusIndicator status={status} />) : 'brak'} </td>
            <td className="d-table-cell d-xxl-none table--customer align-middle">{customer}<br /><span className="text-mute-2">{location}</span></td>
            <td className="d-none d-xxl-table-cell table--customer align-middle">{customer}</td>
            <td className="d-none d-xxl-table-cell table--location align-middle">{location}</td>
            <td className='d-none d-xl-table-cell align-middle' data-bs-toggle={description.length > 21 ? "tooltip" : 'disabled'} data-bs-placement="top" data-bs-title={description} data-bs-custom-class="ps-tooltip">{description}</td>
            <td className='d-none d-md-table-cell align-middle'>
                <div className='d-flex align-items-center'>
                    {(searchedSalesPerson && searchedSalesPerson.photo) && <Image src={searchedSalesPerson.photo} className='me-2' roundedCircle style={{ height: '2.25rem' }} />}
                    {user}
                </div>
            </td>
            <td className='d-none d-lg-table-cell align-middle'> {moment(createdAt).fromNow()} </td>
            <td className="align-middle"><FiEdit3 size='1.5em' onClick={() => toggleModalVisible(post._id)} className='m-0 project-edit-icon' /></td>
        </tr>
    )

}