import { useEffect, useState } from "react";
import { Form, FloatingLabel, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import background from '../images/multi-bay-racking-mam-38978-1200x800.png'

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    
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
        const userData = {email, password}
        dispatch(login(userData))
        }
    
    return (
        <Container fluid className='login text-center min-vw-100 overflow-hidden'>
            <Row className="h-100">
                <Col className='h-100'>
                    <Form onSubmit={onSubmit} className='login-form d-flex mx-auto flex-column justify-content-center h-100 gap-3 w-75 pb-5'>
                        <h1 className='mt-3 mb-4 px-0'>Zaloguj się<br />
                            <small class="text-muted fs-5 fw-normal">Wprowadź użyty podczas rejestracji email oraz hasło</small>
                        </h1>
                        <Form.Group className="text-start">
                            <Form.Label className='mb-1'>
                                <small>Wpisz adres email</small>
                            </Form.Label>
                            <Form.Control
                                name='email'
                                placeholder="ABC@jh.pl"
                                onChange={onChange}
                                value={email}
                                type='email'
                                size="lg"
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
                                size="lg"

                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Button className='btn-ps-prim w-100' size="lg" disabled={isLoading} type="submit">Zaloguj się</Button>
                        </Form.Group>
                        <span>
                            <span className="text-muted fw-normal">
                                {'Nie masz jeszcze konta? '}
                            </span>
                            <Link to="/signup/" style={{ color: 'var(--ps-prim-700)', fontWeight: '500' }}>
                                <span>
                                    Zarejestruj się.
                                </span>
                            </Link>
                        </span>
                    </Form>
                </Col>
                <Col lg={7} xl={8} className='d-none d-lg-block bg-image h-100' style={{ backgroundImage: `url(${background})` }}></Col>
            </Row>
        </Container>
    )

}