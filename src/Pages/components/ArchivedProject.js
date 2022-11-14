import React from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

export default function ArchivedProject(props) {
    const { currentId, setCurrentId, editPost, post } = props
    return  (
        <Card as={Row} className="my-4 border border-0" >
            <Card.Header className='bg-warning border border-0 d-flex justify-content-between'>
                <p className="text-capitalize fs-5 m-0">{post.projectNumber}</p>
                <PencilSquare className='edit-button' onClick={() => editPost(post._id)} size={25}/>
            </Card.Header>
            <Card.Body className='d-flex'>
                <Card.Title className='col-3 col-lg-2'>{post.customer} <h6>{post.location}</h6></Card.Title>
                <Card.Text>{post.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="card-footer border-top"> <p className="text-capitalize fs-6 m-0">{post.user}</p></Card.Footer>
        </Card>
    )
}