import React from "react";
import { Row, Col, Card, Image} from 'react-bootstrap';
import {users} from '../data/users'
import moment from 'moment';
import StatusIndicator from "../components/StatusIndicator";

export default function ArchivedProject(props) {
    const { setPostToEdit, toggleModalVisible, post } = props
    const searchedUser = users.filter(user => user.value === post.user)[0]
    const {projectNumber, user, location, description, customer, createdAt, status} = post

    return (
        <tr onClick={() => toggleModalVisible(post._id)}>
            <td className="table--status">{status !== null ? (<StatusIndicator status={status} />) : 'brak'} </td>
            <td><span className="strong">{projectNumber}</span></td>
            <td className="table--customer">{customer}</td>
            <td className="table--location">{location}</td>
            <td className='d-none d-lg-table-cell'>{description}</td>
            <td className='d-none d-md-table-cell'>
                <div className='d-flex align-items-center'>
                    {(searchedUser && searchedUser.photo) && <Image src={searchedUser.photo} className='me-2'roundedCircle style={{ height: '1.5rem' }} />}
                    {user}
                </div>
            </td>
            <td className='d-none d-md-table-cell'>{moment(createdAt).format("D.M.YYYY")} r., <span className='weak d-none d-lg-inline'>{moment(createdAt).format("H:M")}</span></td>
        </tr>
    )

}