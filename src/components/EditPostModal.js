import React, { useEffect } from "react";
import { Modal, Button, Row, Col, Form, InputGroup} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {ToggleButton, ToggleButtonGroup} from '@mui/material/';
import moment from 'moment'
import { users as options } from '../data/users';
import { updatePost } from "../actions/posts";
import { useDispatch } from 'react-redux'
import { RxArchive } from 'react-icons/rx';
import { IoShareOutline, IoFlashOutline, IoCloseCircleOutline } from 'react-icons/io5';



export default function EditPostModal(props) {
    const { showModal, setShowModal, postData, setPostData, setPostToEditId } = props
    const { _id, customer, user, location, projectNumber, createdAt, description, status} = postData
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
                    className='className="text-capitalize mb-3'
                    onInputChange={(e, newInputValue) => {
                        setPostData({...postData, user: newInputValue})
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField required {...params} label="Użytkownik" />}
                    sx={{ backgroundColor: 'white' }}
                />
                {/* <div class="btn-group d-flex" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio" id="btn-ofertowany" autocomplete="off" />
                    <label class="btn btn-outline-primary" for="btn-ofertowany">Ofertowany</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btn-zamówiony" autocomplete="off" />
                    <label class="btn btn-outline-primary" for="btn-zamówiony">Zamówiony</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btn-przegrany" autocomplete="off" />
                    <label class="btn btn-outline-primary" for="btn-przegrany">Przegrany</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btn-zamknięty" autocomplete="off" />
                    <label class="btn btn-outline-primary" for="btn-zamknięty">Zamknięty</label>
                </div> */}

                <ToggleButtonGroup
                    fullWidth
                    size='medium'
                    value={''}
                    exclusive
                    onChange={''}
                    aria-label="text alignment"
                    >
                    <ToggleButton value="ofertowany" aria-label="ofertowany">
                        <IoShareOutline size='20' className='me-2' /> ofertowany
                    </ToggleButton>
                    <ToggleButton value="realizacja" aria-label="realizacja">
                        <IoFlashOutline size='20' className='me-2' />realizacja
                    </ToggleButton>
                    <ToggleButton value="przegrany" aria-label="przegrany">
                        <IoCloseCircleOutline size='20' className='me-2' />przegrany
                    </ToggleButton>
                </ToggleButtonGroup>
            
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