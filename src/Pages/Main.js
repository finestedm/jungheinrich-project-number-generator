import React, { useState } from 'react'
import { Container, Button, FloatingLabel, Form, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Main() {

    const [name, setName] = useState('')
    const isNameValid = (name) => name.length < 3
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [user, setUser] = useState('')
    const [projectNumber, setProjectNumber] = useState('')
    const [buttonText, setButtonText] = useState('Generuj nowy nr projektu')
    const [buttonVariant, setButtonVariant] = useState('warning')

    function submitNewProject(e) {
        if (isNameValid && user !== '') {
            setProjectNumber(5281123)
            navigator.clipboard.writeText(projectNumber)
            console.log({
                projectNumber: projectNumber,
                name: name,
                location: location,
                description: description,
                user: user
            })
        } else {
            setButtonText('Nie wpisano wymaganych danych!')
            setButtonVariant('danger')
            setTimeout(() => {
                setButtonText('Generuj nowy nr projektu')
                setButtonVariant('warning')
            }, 3000);
        }
    }

    return (
        <Container className='text-center h-100 gap-3 d-grid p-4'>
            <h2>Hello Main</h2>
            <Form id='project-details' as={Row} className='justify-content-between gap-3 needs-validation' noValidate>
                <TextField
                    required
                    id="outlined-name"
                    label="Nazwa klienta"
                    minLength={3}
                    error={isNameValid(name)}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    id="outlined-name"
                    label="Miejscowość"
                    onChange={(e) => setLocation(e.target.value)}
                />

                <TextField
                    fullWidth
                    id="outlined-name"
                    label="Opis projektu"
                    onChange={(e) => setDescription(e.target.value)}

                />

                <Autocomplete
                    required
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    className='p-0'
                    renderInput={(params) => <TextField {...params} label="Użytkownik" />}
                    onChange={(e, value) => setUser(value.value)}
                />
            </Form>

            <Row>
                <Button type='submit' form='project-details' variant={buttonVariant} className='mt-5 p-4' onClick={(e) => submitNewProject(e)}> {buttonText} </Button>{' '}
            </Row>
            
            <Row>
                <TextField
                    fullWidth
                    className='output-field'
                    id="outlined"
                    label="Nr projektu"
                    readOnly
                    value={projectNumber}
                    onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                />
            </Row>

            <Row>
            <Link to='/archive'>
                <Button variant='outline-secondary' className='btn p-3 mt-5'> Wyświetl archiwum projektów </Button>
            </Link>
            </Row>
        </Container>
    )
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]