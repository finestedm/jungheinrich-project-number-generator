import React, { useEffect, useState } from 'react'
import { Container, Button, FloatingLabel, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux'
import { getPosts, createPost } from '../actions/posts'
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
    const [buttonVariant, setButtonVariant] = useState('warning')
    const [postsData, setPostsData] = useState([])

    const { user } = useSelector((state => state.authSlice))
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    

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
            setButtonVariant('danger')
            setTimeout(() => {
                setButtonText('Generuj nowy numer')
                setButtonVariant('warning')
            }, 2000);
        } else {
            setButtonText('Nie wpisano wymaganych danych!')
            setButtonVariant('danger')
            setTimeout(() => {
                setButtonText('Generuj nowy numer')
                setButtonVariant('warning')
            }, 2000);
        }
    }

    return (
        <Container fluid className='main d-flex flex-column justify-content-start w-100 px-4 py-2 mb-5'>
            <h1 className='text-start mt-3 mb-4 px-0'>Generuj numer projektu <br />
                <small class="text-muted fs-5 fw-normal">Wprowadź dane projektu i uzyskaj numer referencyjny</small>
            </h1>
            <Form id='project-details' as={Row} className='justify-content-between gap-3 mb-3 px-2 needs-validation' noValidate>
                <Autocomplete
                    required
                    fullWidth
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
                    fullWidth
                    variant="outlined"
                    label="Opis projektu"
                    error={description.length > 250}
                    helperText={description.length > 250 ? 'Max 250 znaków' : ''}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                />
 
                <Autocomplete
                    fullWidth
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

            <Row className='px-2 my-4'>
                <Button type='submit' form='project-details' variant={buttonVariant} className='submit-button p-3 mb-3 fs-4 fw-bolder' onClick={(e) => submitNewProject(e)}> {buttonText} </Button>{' '}
            </Row>
            
            <Row className='px-2'>
                <InputGroup className='project-number-output p-0' >
                    <Form.Control
                        readOnly
                        className=''
                        variant="outlined"
                        size='lg'
                        placeholder='...'
                        value={projectNumber}
                    />
                    <Button variant="warning" onClick={(e) => navigator.clipboard.writeText(e.target.value)}><IoCopyOutline/></Button>
                </InputGroup>
            </Row>
        </Container>
    )
}