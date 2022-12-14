import React, { useEffect } from "react";
import { Modal, Button, Row, Col, Form, InputGroup} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {ToggleButton, ToggleButtonGroup} from '@mui/material/';
import moment from 'moment'
import 'moment/locale/pl' 
import { users as options } from '../data/users';
import { updatePost } from "../actions/posts";
import { useDispatch, useSelector } from 'react-redux'
import { IoDocumentTextOutline, IoFlashOutline, IoCloseCircleOutline } from 'react-icons/io5';

moment.locale('pl');

export default function EditPostModal(props) {
    const { showModal, setShowModal, postData, setPostData, setPostToEditId } = props
    const { _id, customer, user, location, projectNumber, createdAt, description, status} = postData
    const dispatch = useDispatch()

    const posts = useSelector((state) => state.posts)

    function isCustomerValid() {
        return customer.length >= 3
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title className="fs-3">Edycja danych projektu {projectNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField
                    fullWidth
                    size={window.innerWidth <=500 ? 'small' : 'normal'}
                    disabled
                    className='edit-post-modal--input mb-3'
                    variant="outlined"
                    label="Numer projektu"
                    value={projectNumber}
                    sx={{backgroundColor: 'white'}}
                />
                <Autocomplete
                    required
                    fullWidth
                    disablePortal
                    freeSolo
                    id="combo-box-demo"
                    options={[...new Set(posts.map(post => post.customer))]}
                    className='edit-post-modal--input mb-3'
                    value={customer}
                    onInputChange={(e, value) => {setPostData({...postData, customer: value})}}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField error={!isCustomerValid()} required {...params} label="Nazwa klienta"/>}
                    sx={{ backgroundColor: 'white' }}
                    helperText={isCustomerValid() ? '' : 'Minimum 3 znaki'}
                />  
                <TextField
                    fullWidth
                    size={window.innerWidth <=500 ? 'small' : 'normal'}
                    className='edit-post-modal--input mb-3'
                    variant="outlined"
                    label="Miejscowo????"
                    value={location}
                    onChange={(e) => setPostData({...postData, location: e.target.value})}
                    sx={{backgroundColor: 'white'}}
                />
                <TextField
                    fullWidth
                    multiline
                    size={window.innerWidth <=500 ? 'small' : 'normal'}
                    className='edit-post-modal--input mb-3'
                    variant="outlined"
                    maxRows={4}
                    label="Opis"
                    value={description}
                    error={description.length > 250}
                    helperText={description.length > 250 ? 'Max 250 znak??w' : ''}
                    onChange={(e) => setPostData({...postData, description: e.target.value})}
                    sx={{backgroundColor: 'white'}}
                />
                <Autocomplete
                    fullWidth
                    size={window.innerWidth <=500 ? 'small' : 'normal'}
                    disablePortal
                    id="combo-box-demo edit-post-modal--input"
                    options={options}
                    value={user}
                    ListboxProps={{style: {maxHeight: '13rem'}}}
                    className='className="text-capitalize mb-3'
                    onInputChange={(e, newInputValue) => {
                        setPostData({...postData, user: newInputValue})
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField error={!user} helperText={user ? '' : 'Wybierz prowadz??cego projekt'} required {...params} label="U??ytkownik" />}
                    sx={{ backgroundColor: 'white' }}
                />

                <ToggleButtonGroup
                    className='d-none d-sm-flex'
                    fullWidth
                    size={window.innerWidth <=500 ? 'small' : 'normal'}
                    value={status}
                    exclusive
                    onChange={(e, val) => {setPostData({ ...postData, status: val })}}
                    aria-label="project status"
                    >
                    <ToggleButton className='modal--status-switch' id='status-0' value={0} aria-label="ofertowany" selected={status === 0}>
                        <IoDocumentTextOutline size='1.2rem'  className='me-2' />
                        <span className='text-capitalize'>ofertowany</span>
                    </ToggleButton>
                    <ToggleButton  className='modal--status-switch' id='status-1' value={1} aria-label="realizacja" selected={status === 1}>
                        <IoFlashOutline size='1.2rem' className='me-2' />
                        <span className='text-capitalize'>realizacja</span>
                    </ToggleButton>
                    <ToggleButton  className='modal--status-switch' id='status-2' value={2} aria-label="przegrany" selected={status === 2}>
                        <IoCloseCircleOutline size='1.2rem' className='me-2' />
                        <span className='text-capitalize'>przegrany</span>
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup
                    className='d-flex d-sm-none'
                    fullWidth
                    orientation="vertical"
                    size={window.innerWidth <=500 ? 'small' : 'normal'}
                    value={status}
                    exclusive
                    onChange={(e, val) => {setPostData({ ...postData, status: val })}}
                    aria-label="project status"
                    >
                    <ToggleButton className='modal--status-switch' id='status-0' value={0} aria-label="ofertowany" selected={status === 0}>
                        <IoDocumentTextOutline size='1rem' className='me-2' />
                        <span className='text-capitalize'>ofertowany</span>
                    </ToggleButton>
                    <ToggleButton  className='modal--status-switch' id='status-1' value={1} aria-label="realizacja" selected={status === 1}>
                        <IoFlashOutline size='1rem'  className='me-2' />
                        <span className='text-capitalize'>realizacja</span>
                    </ToggleButton>
                    <ToggleButton  className='modal--status-switch' id='status-2' value={2} aria-label="przegrany" selected={status === 2}>
                        <IoCloseCircleOutline size='1rem'  className='me-2' />
                        <span className='text-capitalize'>przegrany</span>
                    </ToggleButton>
                </ToggleButtonGroup>
                    
            </Modal.Body>
            <Modal.Footer className='justify-content-between d-flex align-items-center'>
                <Col xs={12} md={6} className="me-auto">
                    <small>Utworzono: {moment(createdAt).format("D.M.YYYY")}, {moment(createdAt).format("H:mm")}</small>
                </Col>
                <Col className='text-end'>
                    <Button
                        className='mx-2 btn-ps-accept'
                        disabled={!isCustomerValid() || !user}
                        onClick={() => {
                            if (isCustomerValid() && user) {
                                dispatch(updatePost(_id, postData))
                                setPostToEditId(null)
                                setShowModal(false)
                            }
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