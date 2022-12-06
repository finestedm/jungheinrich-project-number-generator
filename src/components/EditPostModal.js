import React, { useEffect } from "react";
import { Modal, Button, Row, Col } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment'
import { users as options } from '../data/users';
import { updatePost } from "../actions/posts";
import { useDispatch } from 'react-redux'



export default function EditPostModal(props) {
    const { showModal, setShowModal, postData, setPostData, setPostToEditId } = props
    const { _id, customer, user, location, projectNumber, createdAt, description } = postData
    const dispatch = useDispatch()

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edycja danych projektu {projectNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField
                    fullWidth
                    disabled
                    className='edit-post-modal--input mb-3'
                    variant="outlined"
                    label="Numer projektu"
                    value={projectNumber}
                    sx={{backgroundColor: 'white'}}
                />
                <TextField
                    fullWidth
                    className='edit-post-modal--input mb-3'
                    variant="outlined"
                    label="Nazwa klienta"
                    value={customer}
                    onChange={(e) => setPostData({...postData, customer: e.target.value})}
                    sx={{backgroundColor: 'white'}}
                />
                <TextField
                    fullWidth
                    className='edit-post-modal--input mb-3'
                    variant="outlined"
                    label="Miejscowość"
                    value={location}
                    onChange={(e) => setPostData({...postData, location: e.target.value})}
                    sx={{backgroundColor: 'white'}}
                />
                <TextField
                    fullWidth
                    multiline
                    className='edit-post-modal--input mb-3'
                    variant="outlined"
                    maxRows={4}
                    label="Opis"
                    value={description}
                    onChange={(e) => setPostData({...postData, description: e.target.value})}
                    sx={{backgroundColor: 'white'}}
                />
                <Autocomplete
                    fullWidth
                    disablePortal
                    id="combo-box-demo edit-post-modal--input"
                    options={options}
                    value={user}
                    className='className="text-capitalize'
                    onInputChange={(e, newInputValue) => {
                        setPostData({...postData, user: newInputValue})
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField required {...params} label="Użytkownik" />}
                    sx={{ backgroundColor: 'white' }}
                />
            </Modal.Body>
            <Modal.Footer className='justify-content-between d-flex align-items-center'>
                <Col xs={12} md={5} className="me-auto">
                    Utworzono: {moment(createdAt).fromNow()}
                </Col>
                <Col className='text-end'>
                    <Button
                        className='mx-2'
                        variant="warning"
                        onClick={() => {
                        dispatch(updatePost(_id, postData))
                        setPostToEditId(null)
                        setShowModal(false)
                    }}>
                        Zapisz zmiany
                    </Button>
                    <Button variant="outline-secondary" onClick={() => {
                        setShowModal(false)
                        setPostToEditId(null)
                    }}>
                        Anuluj
                    </Button>
                </Col>
            </Modal.Footer>
        </Modal>
    )
}