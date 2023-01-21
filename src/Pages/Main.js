import React, { useEffect, useState } from 'react'
import { Container, Button, FloatingLabel, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch } from 'react-redux'
import { getPosts, createPost } from '../actions/posts'
import { getUsers } from '../features/auth/authSlice';
import { useSelector } from 'react-redux'
import { salesPersons as options, salesPersons } from '../data/salesPersons';
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
        <Container fluid className='main px-2 px-md-5 py-2'>
            <h1 className='mt-3 mb-4 px-0'>Generuj numer projektu <br />
                <small class="text-mute fs-5">Wprowadź dane projektu i uzyskaj numer referencyjny</small>
            </h1>
            <Form id='project-details' className='new-project-form d-flex flex-column mx-auto gap-4 needs-validation mb-3' noValidate> 
                
                <Row className='px-0 mx-0 pt-3 section'>
                    <Col xs={12} sm={6} className='px-0 mx-0'>
                        <h6 className='mb-3'>
                            Dane klienta
                            <br /><small className='text-mute'>Podstawowe informacje o kliencie</small>
                        </h6>
                    </Col>
                    <Col className='px-0 mx-0 d-flex gap-2 flex-column'>
                        <Form.Group className='px-0'>
                            <Form.Label className='mb-1'><small>Nazwa klienta *</small></Form.Label>
                            <Typeahead
                                required
                                allowNew
                                isInvalid={customer.length < 3}
                                options={[...new Set(posts.map(post => post.customer))]}
                                onChange={(e) => setCustomer(e[0])}
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
                                onChange={(e) => setLocation(e.target.value)}
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
                                onChange={(e) => setDescription(e.target.value)}
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
                                isInvalid={(salesPersons.filter(person => person.value === salesPerson)).length === 0}
                                onChange={(e) => setSalesPerson(e[0])}
                            />
                            <Form.Text className="text-mute">
                                <small>* Pole wymagane</small>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

            
                <Row className='px-0 mx-0 pt-3 section'>
                    <Col xs={12} sm={6} className='px-0 mx-0'>
                        <h6 className='mb-3'>
                            Generuj numer
                            <br /><small className='text-mute'>Nowy numer projektu</small>
                        </h6>
                    </Col>
                    <Col xs={12} sm={6} className='p-0 m-0'>
                        <InputGroup size='lg' className='project-number-output p-0' >
                            <Form.Control
                                readOnly
                                className=''
                                variant="outlined"
                                placeholder='...'
                                value={projectNumber}
                            />
                            <Button type='submit' form='project-details' className='submit-button btn-ps-outline-border' onClick={(e) => submitNewProject(e)}> {buttonText} </Button>{' '}
                            <Button className='btn-ps-outline-border' onClick={(e) => navigator.clipboard.writeText(e.target.value)}><IoCopyOutline/></Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>

        </Container>
    )
}