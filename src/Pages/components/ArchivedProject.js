import React from "react";
import {Container, Row, Col, Button, Card} from 'react-bootstrap'

export default function ArchivedProject(props) {
    const { currentId, setCurrentId, post } = props
    return  (
        <Card as={Row} className="my-3" >
            <Card.Header className='bg-warning'><p className="text-capitalize fs-5 m-0">{post.projectNumber}</p></Card.Header>
            <Card.Body className='d-flex'>
                <Card.Title className='col-3 col-lg-2'>{post.customer} <h6>{post.location}</h6></Card.Title>
                <Card.Text>{post.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="card-footer"> <p className="text-capitalize fs-6 m-0">{post.user}</p></Card.Footer>
        </Card>
    )
}