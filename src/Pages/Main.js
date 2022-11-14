import React, { useEffect, useState } from 'react'
import { Container, Button, FloatingLabel, Form, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux'
import { getPosts, createPost } from '../actions/posts'
import {useSelector} from 'react-redux'

export default function Main() {

    const [customer, setCustomer] = useState('')
    const isCustomerValid = (customer) => customer.length < 3
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [user, setUser] = useState('')
    const [projectNumber, setProjectNumber] = useState('')
    const [buttonText, setButtonText] = useState('Generuj nowy nr projektu')
    const [buttonVariant, setButtonVariant] = useState('warning')
    const [postData, setPostData] = useState({
        user: '', customer: '', description: '', location: '', projectNumber: ''
    })

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    async function submitNewProject(e) {
        if (isCustomerValid && user) {
            const newProjectNumber = posts[0].projectNumber + 1
            setProjectNumber(newProjectNumber)
            navigator.clipboard.writeText(newProjectNumber)
            const newProjectData = {
                projectNumber: newProjectNumber,
                customer: customer,
                location: location,
                description: description,
                user: user
            }
            dispatch(createPost({ ...newProjectData }))
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
        <Container className='main text-center h-75 gap-3 d-grid p-4'>
            <h2>Hello Main</h2>
            <Form id='project-details' as={Row} className='justify-content-between gap-3 needs-validation' noValidate>
                <TextField
                    required
                    className='main--input'
                    variant="outlined"
                    label="Nazwa klienta"
                    minLength={3}
                    error={isCustomerValid(customer)}
                    onChange={(e) => setCustomer(e.target.value)}
                />

                <TextField
                    className='main--input'
                    variant="outlined"
                    label="Miejscowość"
                    onChange={(e) => setLocation(e.target.value)}
                />

                <TextField
                    className='main--input'
                    fullWidth
                    variant="outlined"
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
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="Użytkownik" />}
                    onChange={(e, value) => value === null ? setUser('') : setUser(value.value)}
                    sx={{backgroundColor: 'white'}}

                />
            </Form>

            <Row>
                <Button type='submit' form='project-details' variant={buttonVariant} className='mt-5 p-4' onClick={(e) => submitNewProject(e)}> {buttonText} </Button>{' '}
            </Row>
            
            <Row>
                <TextField
                    fullWidth
                    className='main--output'
                    variant="outlined"
                    label="Nr projektu"
                    readOnly
                    value={projectNumber}
                    sx={{backgroundColor: 'white'}}
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