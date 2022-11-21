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
    const [postsData, setPostsData] = useState([])

    function isCustomerValid() {
        return customer.length > 3
    }

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    useEffect(() => {
        setPostsData(posts)
    }, [posts]);

    function cleanInputs() {
        setCustomer('')
        setLocation('')
        setUser('')
        setDescription('')
    }

    function searchLastProjectNumber() {
        let highestValue = 0;
        postsData.forEach(post => post.projectNumber > highestValue ? highestValue = post.projectNumber : {})
        return highestValue
    }

    async function submitNewProject() {
        if (isCustomerValid() && user) {
            const newProjectNumber = (searchLastProjectNumber() +1)
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
            cleanInputs()
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
        <Container className='main text-center d-grid mt-3 px-4 align-items-center '>
            <Form id='project-details' as={Row} className='justify-content-between gap-3 mb-3 needs-validation' noValidate>
                <TextField
                    required
                    className='main--input'
                    variant="outlined"
                    label="Nazwa klienta"
                    minLength={3}
                    error={!isCustomerValid()}
                    value={customer}
                    onChange={(e) => {
                        setCustomer(e.target.value)
                    }
                    }
                />

                <TextField
                    className='main--input'
                    variant="outlined"
                    label="Miejscowość"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <TextField
                    className='main--input'
                    fullWidth
                    variant="outlined"
                    label="Opis projektu"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                />
 
                <Autocomplete
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    className='p-0'
                    value={user}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField error={user === ''} required {...params} label="Użytkownik" />}
                    onChange={(e, value) => value === null ? setUser('') : setUser(value)}
                    sx={{backgroundColor: 'white'}}

                />
            </Form>

            <Row>
                <Button type='submit' form='project-details' variant={buttonVariant} className='submit-button p-4 fs-4 mb-3 fw-bolder' onClick={(e) => submitNewProject(e)}> {buttonText} </Button>{' '}
            </Row>
            
            <Row>
                <TextField
                    fullWidth
                    className='main--output mb-3 '
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
                        <Button variant='outline-secondary' className='btn p-3 mb-3 '> Wyświetl archiwum projektów </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}