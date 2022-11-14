import React, { useEffect, useState } from 'react'
import { Container, Button, FloatingLabel, Form, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux'
import { getPosts, createPost } from '../actions/posts'
import { useSelector } from 'react-redux'
import { users as options } from '../data/users';

export default function Main() {

    const [customer, setCustomer] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [user, setUser] = useState('')
    const [projectNumber, setProjectNumber] = useState('')
    const [buttonText, setButtonText] = useState('Generuj nowy nr projektu')
    const [buttonVariant, setButtonVariant] = useState('warning')
    const [postData, setPostData] = useState({
        user: '', customer: '', description: '', location: '', projectNumber: ''
    })
    function isCustomerValid() {
        return customer.length > 3
    }

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    async function submitNewProject() {
        if (isCustomerValid() && user) {
            console.log(isCustomerValid())
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
            }, 2000);
        }
    }

    return (
        <Container className='main text-center gap-3 d-grid p-4'>
            <Form id='project-details' as={Row} className='justify-content-between gap-3 needs-validation' noValidate>
                <TextField
                    required
                    className='main--input'
                    variant="outlined"
                    label="Nazwa klienta"
                    minLength={3}
                    error={!isCustomerValid()}
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
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    className='p-0'
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField required {...params} label="Użytkownik" />}
                    onChange={(e, value) => value === null ? setUser('') : setUser(value.value)}
                    sx={{backgroundColor: 'white'}}

                />
            </Form>

            <Row>
                <Button type='submit' form='project-details' variant={buttonVariant} className='submit-button mt-5 p-4' onClick={(e) => submitNewProject(e)}> {buttonText} </Button>{' '}
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
                <Col>
                    <Link  className='col-3' to='/archive'>
                        <Button variant='outline-secondary' className='btn p-3 mt-5'> Wyświetl archiwum projektów </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}