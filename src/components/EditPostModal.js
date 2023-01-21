import React, { useEffect } from "react";
import { Modal, Button, ButtonGroup, Row, Col, Form, InputGroup, Offcanvas} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {ToggleButton, ToggleButtonGroup} from '@mui/material/';
import moment from 'moment'
import 'moment/locale/pl' 
import { Typeahead } from "react-bootstrap-typeahead";
import { salesPersons as options } from '../data/salesPersons';
import { updatePost } from "../actions/posts";
import { useDispatch, useSelector } from 'react-redux'
import { IoDocumentTextOutline, IoFlashOutline, IoCloseCircleOutline } from 'react-icons/io5';

moment.locale('pl');

export default function EditPostModal(props) {
    const { showModal, setShowModal, postData, setPostData, setPostToEditId } = props
    const { _id, customer, user, location, projectNumber, createdAt, description, status} = postData
    const dispatch = useDispatch()

    console.log(props.postData)

    // const {  } = useSelector((state => state.authSlice))


    const posts = useSelector((state) => state.posts)

    function isCustomerValid() {
        return customer.length >= 3
    }

    console.log(postData)


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
                    <Form.Group className='px-0'>
                        <Form.Label className='mb-1'><small>Nazwa klienta *</small></Form.Label>
                        <Typeahead
                            required
                            allowNew
                            isInvalid={customer.length < 3}
                            options={[...new Set(posts.map(post => post.customer))]}
                            onChange={(v) => handle(v)}
                            onInputChange={(e) => handle( e )}

                        />
                        <Form.Text className="text-mute">
                            <small>* Pole wymagane</small>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='px-0'>
                        <Form.Label className='mb-1'><small>Miejscowość</small></Form.Label>
                        <Form.Control 
                            className='main--input'
                            type="text"
                            value={location}
                            onChange={(e) => setPostData({ ...postData, location: e.target.value })}
                        />
                        <Form.Text className="text-mute">
                            <small> </small>
                        </Form.Text>
                    </Form.Group>  
                    
                    <Form.Group className='px-0'>
                        <Form.Label className='mb-1'><small>Opis projektu</small></Form.Label>
                        <Form.Control 
                            className='main--input'
                            type="text" 
                            value={description}
                            isInvalid={description.length > 250}
                            onChange={(e) => setPostData({...postData, description: e.target.value})}
                        />
                        <Form.Text className="error">
                            <small>{description.length > 250 ?  'Max 250 znaków' : ' '}</small>
                        </Form.Text>
                    </Form.Group> 

                    <Form.Group className='px-0'>
                        <Form.Label className='mb-1'><small>Inżynier sprzedaży *</small></Form.Label>
                        <Typeahead
                            required
                            options={options.map(person => person.value)}
                            isInvalid={(options.filter(person => person.value === user)).length === 0}
                            onChange={(e) => setPostData({ ...postData, user: e })}
                        />
                        <Form.Text className="text-mute">
                            <small>* Pole wymagane</small>
                        </Form.Text>
                    </Form.Group>
                    
                    
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
                        className='btn-ps-prim'
                        size={window.innerWidth>500 && "lg"}
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