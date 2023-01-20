import React, { useEffect, useState } from 'react'
import { Container, Button, FloatingLabel, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux'
import { getPosts, createPost } from '../actions/posts'
import { getUsers } from '../features/auth/authSlice';
import { useSelector } from 'react-redux'
import { salesPersons as options } from '../data/salesPersons';
import { IoCopyOutline } from 'react-icons/io5';

export default function Main() {

    const [customer, setCustomer] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [salesPerson, setSalesPerson] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [projectNumber, setProjectNumber] = useState('')
    const [buttonText, setButtonText] = useState('Generuj nowy numer')
    const [postsData, setPostsData] = useState([])

    const { user } = useSelector((state => state.authSlice))
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    useEffect(() => {
        if (user) {
            setCreatedBy(user._id)

            // checks if logged user is a sales person and sets it as creator of new project
            const isUserSalesPerson = options.filter(salesPerson => salesPerson.value === user.name)[0]
            if (isUserSalesPerson) {
                setSalesPerson(isUserSalesPerson.value)
            }
        }
    }, [])


    function isCustomerValid() {
        return customer.length >= 3
    }

    useEffect(() => {
        dispatch(getPosts())
        dispatch(getUsers())
    }, [dispatch]);

    useEffect(() => {
        setPostsData(posts)
    }, [posts]);

    function cleanInputs() {
        setCustomer('')
        setLocation('')
        setSalesPerson('')
        setDescription('')
    }

    function searchLastProjectNumber() {
        let highestValue = 0;
        postsData.forEach(post => post.projectNumber > highestValue ? highestValue = post.projectNumber : {})
        return highestValue
    }

    async function submitNewProject() {
        if (isCustomerValid() && salesPerson && (postsData.length > 0)) {
            await dispatch(getPosts());     // checking if the posts were updated since the site was loaded
            const newProjectNumber = (searchLastProjectNumber() + 1)
            setProjectNumber(newProjectNumber)
            navigator.clipboard.writeText(newProjectNumber)
            const newProjectData = {
                projectNumber: newProjectNumber,
                customer: customer,
                location: location,
                description: description,
                user: salesPerson,
                createdBy: user._id,
                status: 0
            }
            dispatch(createPost({ ...newProjectData }))
            cleanInputs()
        } else if ((isCustomerValid() && salesPerson && (postsData.length === 0))) {
            setButtonText('Synchronizacja danych. Poczekaj chwilę!')
            setTimeout(() => {
                setButtonText('Generuj nowy numer')
            }, 2000);
        } else {
            setButtonText('Nie wpisano wymaganych danych!')
            setTimeout(() => {
                setButtonText('Generuj nowy numer')
            }, 2000);
        }
    }

    return (
        <Container fluid className='main px-2 px-md-5 py-2 text-center'>
            <h1 className='text-center mt-3 mb-4 px-0'>Generuj numer projektu <br />
                <small class="text-muted fs-5 fw-normal">Wprowadź dane projektu i uzyskaj numer referencyjny</small>
            </h1>
            <Form id='project-details' as={Row} className='new-project-form d-flex mx-auto flex-column gap-3 needs-validation' noValidate>
                <Autocomplete
                    required
                    disablePortal
                    freeSolo
                    id="combo-box-demo"
                    options={[...new Set(posts.map(post => post.customer))]}
                    className='p-0'
                    value={customer}
                    onInputChange={(e, value) => {setCustomer(value)}}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField error={!isCustomerValid()} required {...params} label="Nazwa klienta"/>}
                    sx={{backgroundColor: 'white'}}
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
                    variant="outlined"
                    label="Opis projektu"
                    error={description.length > 250}
                    helperText={description.length > 250 ? 'Max 250 znaków' : ''}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                />
 
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    className='p-0'
                    value={salesPerson}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField error={salesPerson === ''} required {...params} label="Użytkownik" />}
                    onChange={(e, value) => value === null ? setSalesPerson('') : setSalesPerson(value.value)}
                    sx={{backgroundColor: 'white'}}

                />
            </Form>

            <Row className='my-4 mx-auto new-project-form'>
                <Button type='submit' form='project-details' className='submit-button btn-ps-prim p-3 mb-3 fs-4 fw-bolder' onClick={(e) => submitNewProject(e)}> {buttonText} </Button>{' '}
            </Row>
            
            <Row className='mx-auto new-project-form'>
                <InputGroup className='project-number-output p-0' >
                    <Form.Control
                        readOnly
                        className=''
                        variant="outlined"
                        size='lg'
                        placeholder='...'
                        value={projectNumber}
                    />
                    <Button className='btn-ps-prim' onClick={(e) => navigator.clipboard.writeText(e.target.value)}><IoCopyOutline/></Button>
                </InputGroup>
            </Row>
        </Container>
    )
}