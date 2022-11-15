import React from "react";
import { Modal, Button } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment'
import { users as options } from '../../data/users';


export default function EditPostModal(props) {
    const { showModal, setShowModal, postToEdit } = props
    const { customer, user, location, projectNumber, createdAt } = postToEdit
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
                    sx={{backgroundColor: 'white'}}
                />
                <TextField
                    fullWidth
                    className='edit-post-modal--input mb-3'
                    variant="outlined"
                    label="Miejscowość"
                    value={location}
                    sx={{backgroundColor: 'white'}}
                />
                <Autocomplete
                    fullWidth
                    disablePortal
                    id="combo-box-demo edit-post-modal--input"
                    options={options}
                    value={user}
                    className='className="text-capitalize'
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField required {...params} label="Użytkownik" />}
                    sx={{ backgroundColor: 'white' }}
                />
            </Modal.Body>
            <Modal.Footer >
                <p > Utworzono: {moment(createdAt).fromNow()}</p>
                <Button variant="warning" onClick={() => setShowModal(false)}>
                    Zapisz zmiany
                </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Anuluj
                </Button>
            </Modal.Footer>
        </Modal>
    )
}