import { useEffect, useState } from "react";
import { Form, FloatingLabel, Button, Container, Col, Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import branches from '../data/branches'
import { Link } from "react-router-dom";
import background from '../images/stage-automated-high-rack-stacker.jpg'


export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        branch: 'Katowice',
        isAdmin: 0,
    })

    const { name, email, password, password2, branch, isAdmin } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.authSlice)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    function onChange(e) {
        setFormData((prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })))
    }

    function onSubmit(e) {
        e.preventDefault()
        if (password !== password2) {
            console.log('Passwords do not match')
        } else {
            const userData = {
                name, email, password, branch, isAdmin
            }
            dispatch(register(userData))
        }
    }

    return (
        <Container fluid className='main text-center min-vw-100 overflow-hidden'>
            <Row className="h-100">
                <Col className='h-100'>
                    <Form onSubmit={onSubmit} className='signup-form d-flex mx-auto flex-column justify-content-center h-100 gap-3 w-75 pb-5'>
                        <h1 className='mt-3 mb-4 px-0'>Zarejestruj się<br />
                            <small class="text-muted fs-5 fw-normal">Wprowadź swoje dane</small>
                        </h1>
                        <Form.Group className="text-start">
                            <Form.Label className='mb-1'>
                                <small>Wpisz imię i nazwisko</small>
                            </Form.Label>
                            <Form.Control
                                name='name'
                                placeholder="Andrzej Nowak"
                                onChange={onChange}
                                value={name}
                                type='text'
                            />
                        </Form.Group>
                        <Form.Group className="text-start">
                            <Form.Label className='mb-1'>
                                <small>Wprowadź adres email</small>
                            </Form.Label>
                            <Form.Control
                                name='email'
                                placeholder="ABC@jh.pl"
                                onChange={onChange}
                                value={email}
                                type='email'
                            />
                        </Form.Group>
                        <Form.Group className="text-start">
                            <Form.Label className='mb-1'>
                                <small>Wpisz hasło</small>
                            </Form.Label>
                            <Form.Control
                                name='password'
                                type="password"
                                placeholder="Password"
                                onChange={onChange}
                                value={password}
                            />
                        </Form.Group>
                        <Form.Group className="text-start">
                            <Form.Label className='mb-1'>
                                <small>Potwierdź hasło</small>
                            </Form.Label>
                            <Form.Control
                                name='password2'
                                type="password"
                                placeholder="Password"
                                onChange={onChange}
                                value={password2}
                            />
                        </Form.Group>
                        <Form.Group className="text-start">
                            <Form.Label className='mb-1'>
                                <small>Wybierz Oddział</small>
                            </Form.Label>
                            <Form.Select
                                name='branch'
                                onChange={onChange}
                                value={branch}
                            >
                                {Object.values(branches).map(branch => <option>{branch.value}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Button className='btn-ps-prim w-100' size="lg" disabled={isLoading} type="submit">Zarejestruj się</Button>
                        </Form.Group>
                        <span>
                            <span className="text-muted fw-normal">
                                {'Masz już konto? '}
                            </span>
                            <Link to="/login/" style={{ color: 'var(--ps-prim-700)', fontWeight: '500' }}>
                                <span>
                                    Zaloguj się.
                                </span>
                            </Link>
                        </span>
                    </Form>
                </Col>
                <Col lg={7} xl={8} className='d-none d-lg-block'>
                    <Image src={background} className='login-background h-100' />
                </Col>
            </Row>
        </Container>
    )

}