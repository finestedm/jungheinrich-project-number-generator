import React from "react";
import { Row, Col, Card, Image} from 'react-bootstrap';
import { Pencil, ClipboardPlus } from 'react-bootstrap-icons';
import {users} from '../../data/users'

export default function ArchivedProject(props) {
    const { setPostToEdit, toggleModalVisible, post } = props
    const searchedUser = users.filter(user => user.value === post.user)[0]
    
    return  (
        <Card as={Row} className="my-4 border border-0" >
            <Card.Header className='border border-0 d-flex justify-content-between align-items-center'>
                <p className="text-capitalize fs-5 m-0">{post.projectNumber}</p>
                <ClipboardPlus className='copy-button p-1 me-auto ms-1' data-toggle="tooltip" size={25} title='Kopiuj numer projektu' onClick={() => navigator.clipboard.writeText(post.projectNumber)}/>
                <Pencil className='edit-button p-1' data-toggle="tooltip" title='Edytuj ten wpis' onClick={() => toggleModalVisible(post._id)} size={25}/>
            </Card.Header>
            <Card.Body className='gap-2'>
                <Row>
                    <Col md={4} lg={3}>
                        <Card.Title>
                            <p className='text-muted small fw-normal m-0'>Klient:</p>
                            {post.customer}
                            {post.location && <p className='text-muted small m-0 fs-6 fw-normal mt-3'>Lokalizacja:</p>}
                            <h6>{post.location}</h6>
                        </Card.Title>
                    </Col>
                    <Col>
                        <Card.Text>
                            {post.description && <p className='text-muted small m-0 fs-6'>Opis:</p>}
                            {post.description}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="card-footer d-flex align-items-center border-top gap-2">
                {(searchedUser && searchedUser.photo) && <Image src={searchedUser.photo} roundedCircle style={{ height: '2.2rem' }} />}
                <p className="text-capitalize fs-6 m-0">{post.user}</p>
            </Card.Footer>
        </Card>
    )
}