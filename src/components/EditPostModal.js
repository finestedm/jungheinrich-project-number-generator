import React, { useEffect } from "react";
import { Modal, Button, ButtonGroup, Row, Col, Form, InputGroup, Offcanvas} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {ToggleButton, ToggleButtonGroup} from '@mui/material/';
import moment from 'moment'
import 'moment/locale/pl' 
import { salesPersons as options } from '../data/salesPersons';
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
        <Offcanvas className='project-edit-offcanvas' scroll={true} keyboard={true} onEscapeKeyDown={() => setShowModal(false)} onHide={() => setShowModal(false)} show={showModal} placement='end'>
            <Offcanvas.Header>
                <Offcanvas.Title>
                    <h3 className="mb-0">Edycja danych projektu {projectNumber}
                        <br />
                        <small className="text-muted fs-6">Utworzono: {moment(createdAt).format("DD.MM.YYYY")}, {moment(createdAt).format("H:mm")}</small>
                    </h3>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column justify-content-between gap-4">
                <Form>
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
                        size={window.innerWidth <=500 ? 'small' : 'normal'}
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
                        label="Miejscowość"
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
                        helperText={description.length > 250 ? 'Max 250 znaków' : ''}
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
                        renderInput={(params) => <TextField error={!user} helperText={user ? '' : 'Wybierz prowadzącego projekt'} required {...params} label="Użytkownik" />}
                        sx={{ backgroundColor: 'white' }}
                    />

                    {/* <div className="status-switch-buttons bg-dark p-2 d-flex gap-1 justify-content-around">
                        <Button>
                            <IoDocumentTextOutline className='me-2' />
                            <span className='text-capitalize'>ofertowany</span>
                        </Button>
                        <Button>
                            <IoFlashOutline className='me-2' />
                            <span className='text-capitalize'>realizacja</span>
                        </Button>
                        <Button>
                            <IoCloseCircleOutline className='me-2' />
                            <span className='text-capitalize'>przegrany</span>
                        </Button>

                    </div> */}
                    
                    <ToggleButtonGroup
                        className='p-1 d-flex edit-modal button-group'
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

                </Form>
                <Row className='text-end d-flex gap-2 mx-1'>
                    <Button
                        className='btn-ps-accept'
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
                    <Button
                        variant="outline-secondary"
                        onClick={() => {
                            setShowModal(false)
                            setPostToEditId(null)
                        }}>
                        Anuluj
                    </Button>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    )
}